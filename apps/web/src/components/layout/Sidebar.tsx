import Link from "next/link";
import { LayoutDashboard, Server, Settings, Zap, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Routines", href: "#", icon: Zap },
  { name: "Assistant", href: "#", icon: Server },
  { name: "Settings", href: "#", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("flex flex-col w-64 h-screen glass-panel border-r", className)}>
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Ganesh Hub
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              item.name === "Dashboard" 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-muted hover:text-foreground hover:bg-card-hover"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-xs font-bold">GK</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Ganesh K.</span>
            <span className="text-xs text-muted">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
