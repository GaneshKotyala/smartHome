import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: ReactNode;
  title?: string;
  message: string;
  className?: string;
}

export function EmptyState({ icon, title, message, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center h-64 text-muted bg-card rounded-2xl border border-border p-6", className)}>
      <div className="mb-4 opacity-50 text-foreground">
        {icon}
      </div>
      {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
      <p className="mt-1 text-sm text-center">{message}</p>
    </div>
  );
}
