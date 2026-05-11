"use client";

import { useEffect } from "react";
import { useDeviceStore } from "@/store/deviceStore";
import { DeviceCard } from "./DeviceCard";
import { Loader2, ServerOff } from "lucide-react";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";

export function DeviceGrid() {
  const { devices, isLoading, error, fetchDevices } = useDeviceStore();

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
        <p>Connecting to Home Hub...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorState title="Connection Error" message={error} onRetry={fetchDevices} />;
  }

  if (devices.length === 0) {
    return <EmptyState icon={<ServerOff className="w-10 h-10" />} message="No devices found on the network." />;
  }

  // Group by location for a better dashboard feel
  const grouped = devices.reduce((acc, device) => {
    const loc = device.location || 'Unassigned';
    if (!acc[loc]) acc[loc] = [];
    acc[loc].push(device);
    return acc;
  }, {} as Record<string, typeof devices>);

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([location, locationDevices]) => (
        <section key={location}>
          <h2 className="text-lg font-semibold mb-4 text-foreground/90 flex items-center gap-2">
            {location}
            <span className="text-xs font-normal text-muted bg-card-hover px-2 py-0.5 rounded-full">
              {locationDevices.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {locationDevices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
