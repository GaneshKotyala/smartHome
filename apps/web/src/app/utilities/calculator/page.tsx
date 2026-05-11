"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Delete } from "lucide-react";

const BUTTONS = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "⌫", "="],
];

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<string | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);

  const handleBtn = (btn: string) => {
    if (btn === "C") { setDisplay("0"); setPrev(null); setOp(null); setFresh(true); return; }
    if (btn === "⌫") { setDisplay(display.length > 1 ? display.slice(0, -1) : "0"); return; }
    if (btn === "±") { setDisplay(String(parseFloat(display) * -1)); return; }
    if (btn === "%") { setDisplay(String(parseFloat(display) / 100)); return; }

    if (["÷", "×", "−", "+"].includes(btn)) {
      setPrev(display); setOp(btn); setFresh(true); return;
    }

    if (btn === "=") {
      if (!prev || !op) return;
      const a = parseFloat(prev), b = parseFloat(display);
      const result = op === "÷" ? a / b : op === "×" ? a * b : op === "−" ? a - b : a + b;
      setDisplay(String(parseFloat(result.toFixed(10))));
      setPrev(null); setOp(null); setFresh(true);
      return;
    }

    if (btn === "." && display.includes(".")) return;
    const next = fresh || display === "0" ? btn : display + btn;
    setDisplay(next === "." ? "0." : next);
    setFresh(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calculator</h1>
        <p className="text-muted mt-2">Lightweight calculator utility.</p>
      </div>

      <div className="glass-panel rounded-3xl p-6 max-w-sm mx-auto">
        {/* Display */}
        <div className="text-right mb-6">
          <div className="text-muted text-sm h-5">{prev && op ? `${prev} ${op}` : ""}</div>
          <div className="text-5xl font-light tracking-tight truncate">{display}</div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-3">
          {BUTTONS.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => handleBtn(btn)}
              className={cn(
                "aspect-square min-h-[48px] rounded-2xl text-lg font-medium flex items-center justify-center transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                btn === "=" && "bg-primary text-white shadow-lg shadow-primary/30",
                ["÷","×","−","+"].includes(btn) && "bg-primary/20 text-primary",
                ["C","±","%"].includes(btn) && "bg-card-hover text-muted",
                !["=","÷","×","−","+","C","±","%"].includes(btn) && "glass-panel hover:bg-card-hover",
              )}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
