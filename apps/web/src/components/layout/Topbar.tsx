import { Bell, Search, Menu } from "lucide-react";

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="h-16 flex items-center justify-between px-6 glass-panel border-b sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-muted hover:text-foreground rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Search home..." 
            className="bg-card-hover border border-border rounded-full pl-9 pr-4 py-1.5 text-sm outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted hover:text-foreground transition-colors rounded-full hover:bg-card-hover">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
