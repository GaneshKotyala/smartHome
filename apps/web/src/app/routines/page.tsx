"use client";

import { useEffect } from "react";
import { useRoutineStore } from "@/store/routineStore";
import { RoutineCard } from "@/components/routines/RoutineCard";
import { Loader2, AlertCircle, Zap } from "lucide-react";

export default function RoutinesPage() {
  const { routines, isLoading, error, fetchRoutines } = useRoutineStore();

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Routines</h1>
        <p className="text-muted mt-2">Execute grouped automations across your devices instantly.</p>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center h-64 text-muted">
          <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
          <p>Loading routines...</p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center h-64 text-red-400 bg-red-500/10 rounded-2xl border border-red-500/20 p-6">
          <AlertCircle className="w-10 h-10 mb-4" />
          <h3 className="text-lg font-bold">Failed to load routines</h3>
          <p className="text-sm opacity-80 mt-2 text-center">{error}</p>
          <button
            onClick={fetchRoutines}
            className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !error && routines.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-muted bg-card rounded-2xl border border-border p-6">
          <Zap className="w-10 h-10 mb-4 opacity-30" />
          <p>No routines found. Run the seed script to add defaults.</p>
        </div>
      )}

      {!isLoading && !error && routines.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {routines.map((routine) => (
            <RoutineCard key={routine.id} routine={routine} />
          ))}
        </div>
      )}
    </div>
  );
}
