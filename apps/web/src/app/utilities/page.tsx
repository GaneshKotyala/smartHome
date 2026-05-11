import Link from "next/link";
import { StickyNote, Calculator, Palette } from "lucide-react";

const UTILITIES = [
  { name: "Notes", description: "Quick local scratchpad", href: "/utilities/notes", icon: StickyNote, color: "text-amber-400", bg: "bg-amber-400/10" },
  { name: "Calculator", description: "Lightweight math tool", href: "/utilities/calculator", icon: Calculator, color: "text-blue-400", bg: "bg-blue-400/10" },
  { name: "Themes", description: "Customize dashboard look", href: "/utilities/wallpapers", icon: Palette, color: "text-purple-400", bg: "bg-purple-400/10" },
];

export default function UtilitiesHub() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Utilities</h1>
        <p className="text-muted mt-2">Tools to help you manage your home ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {UTILITIES.map((util) => {
          const Icon = util.icon;
          return (
            <Link
              key={util.name}
              href={util.href}
              className="glass-panel p-5 rounded-2xl flex items-start gap-4 hover:bg-card-hover transition-colors focus-visible:ring-2 focus-visible:ring-primary/50 outline-none active:scale-[0.98]"
            >
              <div className={`p-3 rounded-xl ${util.bg} ${util.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{util.name}</h3>
                <p className="text-sm text-muted mt-1">{util.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
