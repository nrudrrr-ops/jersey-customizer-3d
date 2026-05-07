import React, { useState } from "react";
import Scene from "./components/Canvas/Scene";
import ColorPicker from "./components/UI/ColorPicker";
import TextLogoPanel from "./components/UI/TextLogoPanel";
import Presets from "./components/UI/Presets";
import ExportButton from "./components/UI/ExportButton";
import { useStore } from "./store/useStore";

export default function App() {
  const store = useStore();
  const [activeTab, setActiveTab] = useState("left");

  return (
    <div style={{ width: '1298px', height: '500px' }} className="flex bg-[#0a0f18] text-white overflow-hidden font-sans">

      {/* LEFT SIDEBAR */}
      <div className="w-56 bg-black/40 border-r border-white/10 px-3 py-2 flex flex-col gap-2 overflow-hidden shrink-0">
        <div>
          <h1 className="text-sm font-black tracking-wider text-accent uppercase">Jersey Kart</h1>
          <p className="text-[8px] text-gray-500 uppercase tracking-widest">3D Jersey Customizer</p>
        </div>

        <div>
          <p className="text-[8px] uppercase text-gray-500 mb-1">Active Part</p>
          <div className="flex gap-1">
            {["shirt", "shorts", "socks"].map((part) => (
              <button
                key={part}
                onClick={() => store.setActivePart(part)}
                className={`flex-1 py-1 text-[9px] font-bold uppercase rounded transition ${
                  store.activePart === part ? "bg-accent text-black" : "bg-white/5 text-gray-400"
                }`}
              >
                {part}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[8px] uppercase text-gray-500 mb-1">Kit Style</p>
          <div className="grid grid-cols-2 gap-1">
            {["solid", "halves", "stripes", "gradient"].map((s) => (
              <button
                key={s}
                onClick={() => store.setStyle(s)}
                className={`py-1 text-[9px] font-semibold uppercase rounded border transition ${
                  store.style === s ? "border-accent text-accent bg-accent/10" : "border-white/10 text-gray-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <TextLogoPanel />
      </div>

      {/* CENTER 3D */}
      <div className="flex-1 h-full relative">
        <Scene />
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-56 bg-black/40 border-l border-white/10 px-3 py-2 flex flex-col gap-2 overflow-hidden shrink-0">
        <ColorPicker />
        <Presets />
        <ExportButton />
      </div>

    </div>
  );
}
