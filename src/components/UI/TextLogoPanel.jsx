import React from "react";
import { useStore } from "../../store/useStore";

export default function TextLogoPanel() {
  const store = useStore();

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-2">Text & Logo</h3>
      
      {/* Team Name Input */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">Team Name</label>
        <input 
          type="text"
          value={store.teamName || ""}
          onChange={(e) => store.setTeamName(e.target.value)}
          className="bg-black/40 border border-white/10 rounded-md p-2 text-white text-sm"
          placeholder="Enter Team Name"
        />
      </div>

      {/* Player Name Input */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">Player Name</label>
        <input 
          type="text"
          value={store.playerName || ""}
          onChange={(e) => store.setPlayerName(e.target.value)}
          className="bg-black/40 border border-white/10 rounded-md p-2 text-white text-sm"
          placeholder="Enter Player Name"
        />
      </div>

      {/* Number Input */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">Number</label>
        <input 
          type="text"
          value={store.number || ""}
          onChange={(e) => store.setNumber(e.target.value)}
          className="bg-black/40 border border-white/10 rounded-md p-2 text-white text-sm"
          placeholder="Enter Number"
        />
      </div>

      {/* Logo Upload Placeholder */}
      <div className="flex flex-col gap-1 mt-2">
        <label className="text-xs text-gray-400">Upload Logo (PNG)</label>
        <input 
          type="file" 
          accept="image/png"
          className="text-xs text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-black hover:file:bg-cyan-400" 
        />
      </div>
    </div>
  );
}