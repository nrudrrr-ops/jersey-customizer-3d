import React from "react";
import { exportCanvasAsPNG } from "../../utils/exportImage";
import { useStore } from "../../store/useStore";

export default function ExportButton() {
  const { reset } = useStore();
  return (
    <div className="flex gap-2">
      <button
        onClick={exportCanvasAsPNG}
        className="flex-1 bg-accent hover:bg-cyan-300 text-black font-bold py-2 rounded-lg transition"
      >
        ⬇ Export PNG
      </button>
      <button
        onClick={reset}
        className="bg-red-500/80 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition"
      >
        Reset
      </button>
    </div>
  );
}