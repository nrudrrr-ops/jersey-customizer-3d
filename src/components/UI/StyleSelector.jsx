import React from "react";
import { useStore } from "../../store/useStore";

const STYLES = ["solid", "halves", "stripes", "gradient"];

export default function StyleSelector() {
  const { style, setStyle } = useStore();
  return (
    <div className="space-y-3">
      <h3 className="font-bold text-sm uppercase tracking-wider text-accent">Kit Style</h3>
      <div className="grid grid-cols-2 gap-2">
        {STYLES.map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`py-2 rounded-lg capitalize text-sm transition ${
              style === s ? "bg-accent text-black font-bold" : "bg-black/30 hover:bg-black/50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}