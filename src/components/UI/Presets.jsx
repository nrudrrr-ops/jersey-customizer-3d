import React from "react";
import { presets } from "../../utils/presets";
import { useStore } from "../../store/useStore";

export default function Presets() {
  const { setColor } = useStore();

  const apply = (p) => {
    setColor("primaryColor", p.primary);
    setColor("secondaryColor", p.secondary);
    setColor("trimColor", p.trim);
  };

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-sm uppercase tracking-wider text-accent">Presets</h3>
      <div className="grid grid-cols-2 gap-2">
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => apply(p)}
            className="bg-black/30 hover:bg-black/50 border border-white/10 hover:border-accent transition rounded-lg p-2 text-left"
          >
            <div className="flex gap-1 mb-1">
              <div className="w-4 h-4 rounded-full" style={{ background: p.primary }} />
              <div className="w-4 h-4 rounded-full" style={{ background: p.secondary }} />
              <div className="w-4 h-4 rounded-full" style={{ background: p.trim }} />
            </div>
            <p className="text-xs">{p.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}