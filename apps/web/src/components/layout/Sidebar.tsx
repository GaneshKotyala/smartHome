"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Zap, Bot, Settings,
  StickyNote, Calculator, Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MAIN_NAV = [
  { name: "Dashboard", href: "/",         icon: LayoutDashboard },
  { name: "Routines",  href: "/routines", icon: Zap },
  { name: "Assistant", href: "#",         icon: Bot },
];

const UTILITY_NAV = [
  { name: "Notes",      href: "/utilities/notes",      icon: StickyNote },
  { name: "Calculator", href: "/utilities/calculator", icon: Calculator },
  { name: "Themes",     href: "/utilities/wallpapers", icon: Palette },
];

function NavItem({ name, href, icon: Icon, active }: {
  name: string; href: string; icon: any; active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted hover:text-foreground hover:bg-card-hover"
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      {name}
    </Link>
  );
}

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("flex flex-col w-64 h-screen glass-panel border-r border-border", className)}>
      {/* Logo */}
      <div className="p-6 pb-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Ganesh Hub
        </h1>
        <p className="text-xs text-muted mt-0.5">Smart Home Ecosystem</p>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 overflow-y-auto space-y-1">
        {MAIN_NAV.map((item) => (
          <NavItem key={item.name} {...item} active={pathname === item.href} />
        ))}

        {/* Divider */}
        <div className="my-4 flex items-center gap-2 px-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] uppercase tracking-widest text-muted font-semibold">Utilities</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {UTILITY_NAV.map((item) => (
          <NavItem key={item.name} {...item} active={pathname === item.href} />
        ))}
      </nav>

      {/* Footer profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-primary text-xs font-bold">GK</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium">Ganesh K.</span>
            <span className="text-xs text-muted">Local Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
