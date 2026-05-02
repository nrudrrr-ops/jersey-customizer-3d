import React from "react";
import ColorPicker from "../UI/ColorPicker";
import Presets from "../UI/Presets";
import ExportButton from "../UI/ExportButton";

export default function RightSidebar() {
  return (
    <aside className="w-full md:w-80 bg-panel/80 backdrop-blur border-l border-white/5 p-4 overflow-y-auto">
      <div className="space-y-6">
        <ColorPicker />
        <Presets />
        <ExportButton />
      </div>
    </aside>
  );
}