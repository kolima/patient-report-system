interface PageHeaderProps {
  title: string;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, badge, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="mb-2 h-0.5 w-8 rounded-full bg-app-accent" aria-hidden="true" />
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-semibold text-2xl text-app-heading tracking-tight">{title}</h1>
          {badge}
        </div>
        {description && <p className="mt-1.5 max-w-xl text-app-text text-sm leading-relaxed">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
