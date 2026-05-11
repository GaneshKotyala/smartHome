import { DeviceGrid } from "@/components/devices/DeviceGrid";

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted mt-2">Welcome home. Here is the status of your devices.</p>
      </div>
      <DeviceGrid />
    </div>
  );
}
