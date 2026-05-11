"use client";

import { useDeviceStore } from "@/store/deviceStore";
import { DeviceCard } from "./DeviceCard";

export function ModeGrid() {
  const { devices } = useDeviceStore();

  const modes = devices.filter((d) => d.type === 'scene');

  if (modes.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4 text-foreground/90 flex items-center gap-2">
        Modes
        <span className="text-xs font-normal text-muted bg-card-hover px-2 py-0.5 rounded-full">
          {modes.length}
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {modes.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </section>
  );
}
