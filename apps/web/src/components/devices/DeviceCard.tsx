import { Lightbulb, Fan, Settings2, Power } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Device } from "@ganesh-home-hub/shared-types";
import { useDeviceStore } from "@/store/deviceStore";

const iconMap: Record<string, any> = {
  light: Lightbulb,
  fan: Fan,
  scene: Settings2,
};

export function DeviceCard({ device }: { device: Device }) {
  const toggleDevice = useDeviceStore((state) => state.toggleDevice);
  const Icon = iconMap[device.type] || Power;
  
  const isOn = device.state?.on || device.state?.active;
  const isScene = device.type === 'scene';

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl glass-panel p-5 transition-all duration-300",
      "hover:border-primary/30 flex flex-col justify-between h-40",
      isOn && !isScene ? "bg-primary/5 border-primary/20" : ""
    )}>
      {/* Background Glow */}
      {isOn && !isScene && (
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="flex justify-between items-start z-10 relative">
        <div className={cn(
          "p-2.5 rounded-xl transition-colors",
          isOn && !isScene ? "bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-card-hover text-muted"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        
        {device.isSimulated && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full bg-card-hover text-muted border border-border">
            Simulated
          </span>
        )}
      </div>

      <div className="z-10 relative mt-4 flex items-end justify-between">
        <div>
          <h3 className="font-semibold text-lg leading-tight">{device.name}</h3>
          <p className="text-sm text-muted mt-1">{device.location}</p>
        </div>

        <button 
          onClick={() => toggleDevice(device.id)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all",
            "active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50",
            isOn 
              ? "bg-primary text-white shadow-lg" 
              : "bg-card-hover text-foreground border border-border hover:bg-border"
          )}
          aria-label={`Toggle ${device.name}`}
        >
          <Power className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
