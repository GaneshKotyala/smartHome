"use client";

import { BookOpen, Moon, Sun, Zap, CheckCircle, Loader2, AlertCircle, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Routine } from "@ganesh-home-hub/shared-types";
import { useRoutineStore } from "@/store/routineStore";

const iconMap: Record<string, any> = {
  BookOpen, Moon, Sun, Zap,
};

const statusConfig = {
  idle:      { label: "Execute",    icon: Play,        classes: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20" },
  executing: { label: "Executing…", icon: Loader2,     classes: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 cursor-not-allowed" },
  success:   { label: "Done!",      icon: CheckCircle, classes: "bg-green-500/10 text-green-400 border-green-500/20" },
  error:     { label: "Failed",     icon: AlertCircle, classes: "bg-red-500/10 text-red-400 border-red-500/20" },
};

export function RoutineCard({ routine }: { routine: Routine }) {
  const { executeRoutine, executionStatus } = useRoutineStore();
  const status = executionStatus[routine.id] ?? "idle";
  const config = statusConfig[status];
  const Icon = iconMap[routine.icon ?? "Zap"] ?? Zap;
  const StatusIcon = config.icon;
  const isExecuting = status === "executing";

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl glass-panel p-5 flex flex-col gap-4 transition-all duration-300",
      status === "success" && "border-green-500/30",
      status === "executing" && "border-yellow-500/30",
    )}>
      {/* Glow effect during execution */}
      {status === "executing" && (
        <div className="absolute inset-0 bg-yellow-500/5 animate-pulse pointer-events-none rounded-2xl" />
      )}
      {status === "success" && (
        <div className="absolute inset-0 bg-green-500/5 pointer-events-none rounded-2xl" />
      )}

      <div className="flex items-start justify-between z-10 relative">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs text-muted bg-card-hover px-2 py-1 rounded-full border border-border">
          {routine.actions?.length ?? 0} device{(routine.actions?.length ?? 0) !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="z-10 relative">
        <h3 className="font-semibold text-lg">{routine.name}</h3>
        {routine.description && (
          <p className="text-sm text-muted mt-1 leading-relaxed">{routine.description}</p>
        )}
      </div>

      <button
        onClick={() => !isExecuting && executeRoutine(routine.id)}
        disabled={isExecuting}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-medium text-sm transition-all duration-300",
          "active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          config.classes,
        )}
      >
        <StatusIcon className={cn("w-4 h-4", isExecuting && "animate-spin")} />
        {config.label}
      </button>
    </div>
  );
}
