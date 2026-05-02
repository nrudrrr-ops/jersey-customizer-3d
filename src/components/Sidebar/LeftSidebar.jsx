import React from "react";
import { useStore } from "../../store/useStore";
import StyleSelector from "../UI/StyleSelector";
import TextLogoPanel from "../UI/TextLogoPanel";

export default function LeftSidebar() {
  const { activePart, setActivePart } = useStore();
  const parts = ["shirt", "shorts", "socks"];

  return (
    <aside className="w-full md:w-72 bg-panel/80 backdrop-blur border-r border-white/5 p-4 overflow-y-auto">
      <h1 className="text-2xl font-extrabold mb-1">⚽ KIT <span className="text-accent">FORGE</span></h1>
      <p className="text-xs text-gray-400 mb-5">3D Jersey Customizer</p>

      <div className="space-y-5">
        <div>
          <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-2">Active Part</h3>
          <div className="grid grid-cols-3 gap-2">
            {parts.map((p) => (
              <button
                key={p}
                onClick={() => setActivePart(p)}
                className={`py-2 capitalize text-xs rounded-lg ${
                  activePart === p ? "bg-accent text-black font-bold" : "bg-black/30 hover:bg-black/50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <StyleSelector />
        <TextLogoPanel />
      </div>
    </aside>
  );
}