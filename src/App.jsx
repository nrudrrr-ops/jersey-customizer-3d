import React from "react";
import Scene from "./components/Canvas/Scene";
import ColorPicker from "./components/UI/ColorPicker";
import TextLogoPanel from "./components/UI/TextLogoPanel";
import Presets from "./components/UI/Presets"; // 🔥 Path fixed here
import ExportButton from "./components/UI/ExportButton";
import { useStore } from "./store/useStore";

export default function App() {
  const store = useStore();

  return (
    <div className="flex h-screen w-screen bg-[#0a0f18] text-white overflow-hidden font-sans">
      
      {/* Left Sidebar - Options aur Customization ke liye */}
      <div className="w-80 bg-black/40 border-r border-white/10 p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-wider text-accent uppercase">
            Kit Forge
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
            3D Jersey Customizer
          </p>
        </div>

        {/* Part Selector */}
        <div className="flex gap-2">
          {["shirt", "shorts", "socks"].map((part) => (
            <button
              key={part}
              onClick={() => store.setActivePart(part)}
              className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition ${
                store.activePart === part
                  ? "bg-accent text-black font-extrabold"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {part}
            </button>
          ))}
        </div>

        {/* Style Selector */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase text-gray-500 tracking-wider">
            Kit Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["solid", "halves", "stripes", "gradient"].map((s) => (
              <button
                key={s}
                onClick={() => store.setStyle(s)}
                className={`py-2 text-xs font-semibold uppercase rounded-md border transition ${
                  store.style === s
                    ? "border-accent text-accent bg-accent/10"
                    : "border-white/10 text-gray-400 hover:border-white/30"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <ColorPicker />
        <Presets />
        <TextLogoPanel />
        <ExportButton />
      </div>

      {/* Center 3D Canvas View */}
      <div className="flex-1 h-full relative">
        <Scene />
      </div>

    </div>
  );
}