import React from "react";
import Scene from "./components/Canvas/Scene";
import ColorPicker from "./components/UI/ColorPicker";
import TextLogoPanel from "./components/UI/TextLogoPanel";
import Presets from "./components/UI/Presets";
import ExportButton from "./components/UI/ExportButton";
import { useStore } from "./store/useStore";

export default function App() {
  const store = useStore();

  return (
    <div className="flex h-screen w-screen bg-[#0a0f18] text-white overflow-hidden font-sans">

      {/* LEFT SIDEBAR */}
      <div className="w-72 bg-black/40 border-r border-white/10 p-5 flex flex-col gap-5 overflow-y-auto shrink-0">
        <div>
          <h1 className="text-xl font-black tracking-wider text-accent uppercase">Jersey Kart</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">3D Jersey Customizer</p>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] uppercase text-gray-500 tracking-wider">Active Part</p>
          <div className="flex gap-2">
            {["shirt", "shorts", "socks"].map((part) => (
              <button
                key={part}
                onClick={() => store.setActivePart(part)}
                className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition ${
                  store.activePart === part ? "bg-accent text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {part}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] uppercase text-gray-500 tracking-wider">Kit Style</p>
          <div className="grid grid-cols-2 gap-2">
            {["solid", "halves", "stripes", "gradient"].map((s) => (
              <button
                key={s}
                onClick={() => store.setStyle(s)}
                className={`py-2 text-xs font-semibold uppercase rounded-md border transition ${
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
        <p className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 tracking-widest uppercase">
          Drag to rotate - Scroll to zoom
        </p>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-72 bg-black/40 border-l border-white/10 p-5 flex flex-col gap-5 overflow-y-auto shrink-0">
        <ColorPicker />
        <Presets />
        <ExportButton />
      </div>

    </div>
  );
}
