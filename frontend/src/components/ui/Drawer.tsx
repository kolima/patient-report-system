"use client";

import { Sheet, SheetBody, SheetContent, SheetHeader } from "@/components/ui/sheet";

interface DrawerProps {
  open: boolean;
  title: string;
  side: "left" | "right";
  onClose: () => void;
  children: React.ReactNode;
}

export function Drawer({ open, title, side, onClose, children }: DrawerProps) {
  return (
    <div className="lg:hidden">
      <Sheet
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) onClose();
        }}
      >
        <SheetContent side={side}>
          <SheetHeader title={title} onClose={onClose} />
          <SheetBody>{children}</SheetBody>
        </SheetContent>
      </Sheet>
    </div>
  );
}
