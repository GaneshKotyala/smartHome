"use client";

import { useEffect } from "react";
import { useRoutineStore } from "@/store/routineStore";
import { RoutineCard } from "@/components/routines/RoutineCard";
import { Loader2, Zap } from "lucide-react";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";

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
        <ErrorState title="Failed to load routines" message={error} onRetry={fetchRoutines} />
      )}

      {!isLoading && !error && routines.length === 0 && (
        <EmptyState icon={<Zap className="w-10 h-10" />} message="No routines found. Run the seed script to add defaults." />
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
