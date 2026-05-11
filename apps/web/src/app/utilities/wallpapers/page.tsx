"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const THEMES = [
  { id: "dark-blue",   name: "Dark Blue",   preview: "from-blue-950 to-blue-900" },
  { id: "dark-purple", name: "Dark Purple", preview: "from-purple-950 to-purple-900" },
  { id: "dark-zinc",   name: "Zinc Dark",   preview: "from-zinc-950 to-zinc-800" },
  { id: "dark-teal",   name: "Teal Night",  preview: "from-teal-950 to-teal-900" },
  { id: "dark-rose",   name: "Rose Dark",   preview: "from-rose-950 to-rose-900" },
  { id: "dark-amber",  name: "Amber Dusk",  preview: "from-amber-950 to-amber-900" },
];

export default function WallpapersPage() {
  const [selected, setSelected] = useState("dark-zinc");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Themes</h1>
        <p className="text-muted mt-2">
          Choose a dashboard theme. Full dynamic theming coming in a future phase.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setSelected(theme.id)}
            className={cn(
              "relative rounded-2xl overflow-hidden border-2 transition-all active:scale-95",
              selected === theme.id ? "border-primary shadow-lg shadow-primary/20" : "border-border",
            )}
          >
            <div className={cn("h-28 bg-gradient-to-br", theme.preview)} />
            <div className="glass-panel px-3 py-2 text-left">
              <p className="text-sm font-medium">{theme.name}</p>
            </div>
            {selected === theme.id && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="glass-panel rounded-2xl p-4 text-sm text-muted">
        🚧 Dynamic theme switching will be implemented in a future phase. Currently showing a preview of planned themes.
      </div>
    </div>
  );
}
