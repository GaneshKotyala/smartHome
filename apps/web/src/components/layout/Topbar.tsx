import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 glass-panel border-b sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Search home..." 
            className="w-full bg-card-hover border border-border rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <button className="relative p-2 text-muted hover:text-foreground transition-colors rounded-full hover:bg-card-hover focus-visible:ring-2 focus-visible:ring-primary/50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
