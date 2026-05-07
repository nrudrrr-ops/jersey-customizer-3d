import React, { useState } from "react";
import Scene from "./components/Canvas/Scene";
import ColorPicker from "./components/UI/ColorPicker";
import TextLogoPanel from "./components/UI/TextLogoPanel";
import Presets from "./components/UI/Presets";
import ExportButton from "./components/UI/ExportButton";
import { useStore } from "./store/useStore";

export default function App() {
  const store = useStore();
  const [activeTab, setActiveTab] = useState("customize");

  return (
    <div style={{ width: '1298px', height: '500px' }} className="flex bg-[#0a0f18] text-white overflow-hidden font-sans">

      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-black/40 border-r border-white/10 p-4 flex flex-col gap-4 overflow-y-auto shrink-0">
        <div>
          <h1 className="text-base font-black tracking-wider text-accent uppercase">Jersey Kart</h1>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest">3D Jersey Customizer</p>
        </div>

        <div className="space-y-1">
          <p className="text-[9px] uppercase text-gray-500 tracking-wider">Active Part</p>
          <div className="flex gap-1">
            {["shirt", "shorts", "socks"].map((part) => (
              <button
                key={part}
                onClick={() => store.setActivePart(part)}
                className={`flex-1 py-1 text-[10px] font-bold uppercase rounded-md transition ${
                  store.activePart === part ? "bg-accent text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {part}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[9px] uppercase text-gray-500 tracking-wider">Kit Style</p>
          <div className="grid grid-cols-2 gap-1">
            {["solid", "halves", "stripes", "gradient"].map((s) => (
              <button
                key={s}
                onClick={() => store.setStyle(s)}
                className={`py-1 text-[10px] font-semibold uppercase rounded-md border transition ${
                  store.style === s ? "border-accent text-accent bg-accent/10" : "border-white/10 text-gray-400 hover:border-white/30"
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
      <div className="w-64 bg-black/40 border-l border-white/10 p-4 flex flex-col gap-4 overflow-y-auto shrink-0">
        <ColorPicker />
        <Presets />
        <ExportButton />
      </div>

    </div>
  );
}
