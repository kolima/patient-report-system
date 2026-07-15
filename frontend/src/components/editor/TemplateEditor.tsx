"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DraftPreviewDialog } from "@/components/editor/DraftPreviewDialog";
import { EditorEmptyState } from "@/components/editor/EditorEmptyState";
import {
  EditorInspectorPanel,
  EditorInspectorPanelContent,
  type InspectorTab,
} from "@/components/editor/EditorInspectorPanel";
import { EditorLeftPanel, EditorLeftPanelContent, type LeftPanelTab } from "@/components/editor/EditorLeftPanel";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { SortableEditorBlock } from "@/components/editor/SortableEditorBlock";
import { Alert } from "@/components/ui/Alert";
import { Drawer } from "@/components/ui/Drawer";
import { EditorSkeleton } from "@/components/ui/Skeleton";
import { UnsavedChangesDialog } from "@/components/ui/UnsavedChangesDialog";
import { useClinic } from "@/lib/clinic-context";
import { cn } from "@/lib/cn";
import { useReportDataQuery, useTemplateQuery, useUpdateTemplateMutation } from "@/lib/queries";
import { clinicToBranding } from "@/lib/theme";
import { showSuccess } from "@/lib/toast";
import { useMediaQuery } from "@/lib/use-media-query";
import { useUnsavedChangesGuard } from "@/lib/use-unsaved-changes";
import {
  BLOCK_LABELS,
  type BlockType,
  DEFAULT_BLOCK_TITLES,
  parseTemplateConfig,
  type ReportData,
  SINGLETON_BLOCKS,
  type Template,
  type TemplateBlock,
  type TemplateConfig,
} from "@/types";

interface TemplateEditorProps {
  clinicId: string;
  templateId: string;
}

interface TemplateSnapshot {
  name: string;
  config: TemplateConfig;
}

function cloneConfig(config: TemplateConfig): TemplateConfig {
  return structuredClone(config);
}

function createSnapshot(template: Template): TemplateSnapshot {
  return {
    name: template.name,
    config: cloneConfig(parseTemplateConfig(template.config)),
  };
}

function createBlock(type: BlockType): TemplateBlock {
  return {
    id: crypto.randomUUID(),
    type,
    visible: true,
    settings: type === "textBlock" ? { title: DEFAULT_BLOCK_TITLES.textBlock, customText: "" } : {},
  };
}

const CANVAS_DROP_ID = "canvas-drop";

function scrollBlockIntoView(blockId: string) {
  requestAnimationFrame(() => {
    document.getElementById(`editor-block-${blockId}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function CanvasDropZone({ active, children, className }: { active: boolean; children: ReactNode; className?: string }) {
  const { setNodeRef, isOver } = useDroppable({ id: CANVAS_DROP_ID });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        className,
        active && isOver && "rounded-lg ring-2 ring-app-accent/40 ring-offset-2 ring-offset-app-bg",
      )}
    >
      {children}
    </div>
  );
}

export function TemplateEditor({ clinicId, templateId }: TemplateEditorProps) {
  const {
    data: template,
    isLoading: templateLoading,
    error: templateError,
    refetch: refetchTemplate,
  } = useTemplateQuery(clinicId, templateId);
  const {
    data: reportData,
    isLoading: reportLoading,
    error: reportError,
    refetch: refetchReportData,
  } = useReportDataQuery(clinicId);

  const loading = templateLoading || reportLoading;
  const loadError = templateError ?? reportError;
  const loadErrorMessage =
    loadError instanceof Error ? loadError.message : loadError ? "Failed to load template" : null;

  const handleRetryLoad = () => {
    void refetchTemplate();
    void refetchReportData();
  };

  if (loading) {
    return <EditorSkeleton />;
  }

  if (!template || !reportData) {
    return (
      <div className="p-8">
        <Alert variant="error" onRetry={handleRetryLoad}>
          {loadErrorMessage ?? "Failed to load editor"}
        </Alert>
      </div>
    );
  }

  return (
    <TemplateEditorWorkspace
      key={templateId}
      clinicId={clinicId}
      templateId={templateId}
      template={template}
      reportData={reportData}
    />
  );
}

interface TemplateEditorWorkspaceProps {
  clinicId: string;
  templateId: string;
  template: Template;
  reportData: ReportData;
}

function TemplateEditorWorkspace({ clinicId, templateId, template, reportData }: TemplateEditorWorkspaceProps) {
  const { clinic } = useClinic();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const updateTemplate = useUpdateTemplateMutation(clinicId, templateId);

  const [saved, setSaved] = useState<TemplateSnapshot>(() => createSnapshot(template));
  const [draftConfig, setDraftConfig] = useState<TemplateConfig>(() =>
    cloneConfig(parseTemplateConfig(template.config)),
  );
  const [templateName, setTemplateName] = useState(() => template.name);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [activeDragType, setActiveDragType] = useState<BlockType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [inspectorDrawerOpen, setInspectorDrawerOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [leftPanelTab, setLeftPanelTab] = useState<LeftPanelTab>("blocks");
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>("block");
  const scrollToBlockIdRef = useRef<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const isDirty = useMemo(
    () => JSON.stringify(saved.config) !== JSON.stringify(draftConfig) || templateName !== saved.name,
    [saved, draftConfig, templateName],
  );

  const handleSave = useCallback(async (): Promise<boolean> => {
    setError(null);
    try {
      const updated = await updateTemplate.mutateAsync({
        name: templateName,
        config: draftConfig,
      });
      const nextSnapshot = createSnapshot(updated);
      setSaved(nextSnapshot);
      setDraftConfig(cloneConfig(nextSnapshot.config));
      setTemplateName(nextSnapshot.name);
      showSuccess("Template saved successfully.");
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
      return false;
    }
  }, [draftConfig, templateName, updateTemplate]);

  const {
    dialogOpen: leaveDialogOpen,
    isSaving: isLeavingAfterSave,
    handleSaveAndLeave,
    handleContinue: handleLeaveWithoutSaving,
    closeDialog: closeLeaveDialog,
    requestNavigation,
  } = useUnsavedChangesGuard({ isDirty, onSave: handleSave });

  useEffect(() => {
    if (selectedBlockId) {
      setInspectorTab("block");
      if (!isDesktop) {
        setInspectorDrawerOpen(true);
      }
    }
  }, [selectedBlockId, isDesktop]);

  useEffect(() => {
    const blockId = scrollToBlockIdRef.current;
    if (!blockId) return;
    if (!draftConfig.blocks.some((block) => block.id === blockId)) return;

    scrollBlockIntoView(blockId);
    scrollToBlockIdRef.current = null;
  }, [draftConfig.blocks]);

  const usedSingletonTypes = useMemo(() => {
    return new Set(draftConfig.blocks.map((b) => b.type).filter((t) => SINGLETON_BLOCKS.includes(t)));
  }, [draftConfig]);

  const selectedBlock = draftConfig.blocks.find((b) => b.id === selectedBlockId) ?? null;

  const selectBlock = useCallback((id: string) => {
    setSelectedBlockId(id);
    scrollBlockIntoView(id);
  }, []);

  const addBlock = useCallback(
    (type: BlockType, options?: { insertAtIndex?: number }) => {
      let newBlockId: string | null = null;

      setDraftConfig((prev) => {
        if (SINGLETON_BLOCKS.includes(type) && prev.blocks.some((b) => b.type === type)) {
          return prev;
        }
        const block = createBlock(type);
        newBlockId = block.id;

        let insertIndex: number;
        if (options?.insertAtIndex !== undefined) {
          insertIndex = options.insertAtIndex;
        } else if (selectedBlockId) {
          const selectedIndex = prev.blocks.findIndex((b) => b.id === selectedBlockId);
          insertIndex = selectedIndex === -1 ? prev.blocks.length : selectedIndex + 1;
        } else {
          insertIndex = prev.blocks.length;
        }

        const blocks = [...prev.blocks];
        blocks.splice(insertIndex, 0, block);
        return { ...prev, blocks };
      });

      if (newBlockId) {
        scrollToBlockIdRef.current = newBlockId;
        setSelectedBlockId(newBlockId);
      }

      if (!isDesktop) setAddDrawerOpen(false);
    },
    [isDesktop, selectedBlockId],
  );

  const removeBlock = useCallback((id: string) => {
    setDraftConfig((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((b) => b.id !== id),
    }));
    setSelectedBlockId((current) => (current === id ? null : current));
  }, []);

  const updateBlock = useCallback((id: string, patch: Partial<TemplateBlock>) => {
    setDraftConfig((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }));
  }, []);

  const updateTheme = useCallback((patch: Partial<TemplateConfig["theme"]>) => {
    setDraftConfig((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        ...patch,
        colors: patch.colors ? { ...prev.theme.colors, ...patch.colors } : prev.theme.colors,
        fonts: patch.fonts ? { ...prev.theme.fonts, ...patch.fonts } : prev.theme.fonts,
      },
    }));
  }, []);

  const applyTheme = useCallback((theme: TemplateConfig["theme"]) => {
    setDraftConfig((prev) => ({ ...prev, theme }));
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const type = event.active.data.current?.type as BlockType | undefined;
    if (type) setActiveDragType(type);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragType(null);
    const { active, over } = event;

    const paletteType = active.data.current?.paletteType as BlockType | undefined;
    if (paletteType) {
      if (SINGLETON_BLOCKS.includes(paletteType) && usedSingletonTypes.has(paletteType)) {
        return;
      }

      let insertAtIndex = draftConfig.blocks.length;
      if (over) {
        if (over.id !== CANVAS_DROP_ID) {
          const overIndex = draftConfig.blocks.findIndex((b) => b.id === over.id);
          if (overIndex !== -1) insertAtIndex = overIndex;
        }
      }

      addBlock(paletteType, { insertAtIndex });
      return;
    }

    if (!over) return;

    setDraftConfig((prev) => {
      const oldIndex = prev.blocks.findIndex((b) => b.id === active.id);
      const newIndex = prev.blocks.findIndex((b) => b.id === over.id);
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        return prev;
      }
      return {
        ...prev,
        blocks: arrayMove(prev.blocks, oldIndex, newIndex),
      };
    });
  };

  const handleSaveClick = () => {
    void handleSave();
  };

  const handleReset = () => {
    setDraftConfig(cloneConfig(saved.config));
    setTemplateName(saved.name);
    setSelectedBlockId(null);
  };

  const clinicBranding = clinic ? clinicToBranding(clinic) : null;

  const leftPanelProps = {
    tab: leftPanelTab,
    onTabChange: setLeftPanelTab,
    blocks: draftConfig.blocks,
    selectedBlockId,
    usedSingletonTypes,
    onAddBlock: addBlock,
    onSelectBlock: selectBlock,
  };

  const inspectorPanelProps = {
    tab: inspectorTab,
    onTabChange: setInspectorTab,
    block: selectedBlock,
    theme: draftConfig.theme,
    clinic,
    onUpdateBlock: (patch: Partial<TemplateBlock>) => selectedBlock && updateBlock(selectedBlock.id, patch),
    onUpdateTheme: updateTheme,
    onApplyTheme: applyTheme,
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-[calc(100vh-57px)] flex-col">
        <EditorToolbar
          templateName={templateName}
          isDirty={isDirty}
          isSaving={updateTemplate.isPending}
          isDesktop={isDesktop}
          onTemplateNameChange={setTemplateName}
          onBack={() => requestNavigation("/templates")}
          onReset={handleReset}
          onPreview={() => setPreviewOpen(true)}
          onSave={handleSaveClick}
          onOpenAdd={() => setAddDrawerOpen(true)}
          onOpenInspector={() => setInspectorDrawerOpen(true)}
        />

        {error && (
          <div className="shrink-0 px-4 pt-2">
            <Alert variant="error" onDismiss={() => setError(null)}>
              {error}
            </Alert>
          </div>
        )}

        <div className="flex min-h-0 flex-1">
          <EditorLeftPanel {...leftPanelProps} />

          <div className="relative z-10 min-w-0 flex-1 overflow-auto bg-app-bg p-4 sm:p-6">
            <CanvasDropZone active={activeDragType !== null} className="mx-auto max-w-4xl">
              {draftConfig.blocks.length === 0 ? (
                <EditorEmptyState onAddBlock={addBlock} isDesktop={isDesktop} />
              ) : (
                <div className="relative overflow-hidden rounded-lg bg-app-surface shadow-sm ring-1 ring-app-border">
                  <SortableContext items={draftConfig.blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                    {draftConfig.blocks.map((block) => (
                      <SortableEditorBlock
                        key={block.id}
                        block={block}
                        config={draftConfig}
                        reportData={reportData}
                        clinicBranding={clinicBranding}
                        selected={selectedBlockId === block.id}
                        onSelect={() => selectBlock(block.id)}
                        onRemove={() => removeBlock(block.id)}
                        onToggleVisible={() => updateBlock(block.id, { visible: !block.visible })}
                      />
                    ))}
                  </SortableContext>
                </div>
              )}
            </CanvasDropZone>
          </div>

          <EditorInspectorPanel {...inspectorPanelProps} />
        </div>
      </div>

      <Drawer open={addDrawerOpen} title="Add" side="left" onClose={() => setAddDrawerOpen(false)}>
        <EditorLeftPanelContent {...leftPanelProps} />
      </Drawer>

      <Drawer open={inspectorDrawerOpen} title="Inspector" side="right" onClose={() => setInspectorDrawerOpen(false)}>
        <EditorInspectorPanelContent {...inspectorPanelProps} />
      </Drawer>

      <UnsavedChangesDialog
        open={leaveDialogOpen}
        isSaving={isLeavingAfterSave}
        onSave={() => void handleSaveAndLeave()}
        onContinue={handleLeaveWithoutSaving}
        onCancel={closeLeaveDialog}
      />

      <DraftPreviewDialog
        open={previewOpen}
        templateId={templateId}
        templateName={templateName}
        config={draftConfig}
        reportData={reportData}
        clinicBranding={clinicBranding}
        onClose={() => setPreviewOpen(false)}
      />

      <DragOverlay>
        {activeDragType ? (
          <div className="rounded-lg border border-app-accent/40 bg-app-surface px-4 py-2 text-sm shadow-lg">
            {BLOCK_LABELS[activeDragType]}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
