import React, { useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useStore } from "../../store/useStore";

const FIELDS = {
  shirt: [
    { key: "primaryColor", label: "Primary" },
    { key: "secondaryColor", label: "Secondary" },
    { key: "sponsorColor", label: "Sponsor" },
    { key: "trimColor", label: "Trim" },
    { key: "numberColor", label: "Number" },
  ],
  shorts: [
    { key: "shortsColor", label: "Shorts Base" }
  ],
  socks: [
    { key: "socksColor", label: "Socks Base" }
  ],
};

export default function ColorPicker() {
  const store = useStore();
  
  // Check karte hain ki abhi kya select kiya hai (default 'shirt')
  const activePart = store.activePart || "shirt";
  
  // Jo part select hai, uske fields dikhao
  const [active, setActive] = React.useState(FIELDS[activePart][0].key);

  // Jab bhi activePart (Shirt/Shorts/Socks) badle, toh pehla box select ho jaye
  useEffect(() => {
    setActive(FIELDS[activePart][0].key);
  }, [activePart]);

  const currentColor = store[active] || "#ffffff";

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-sm uppercase tracking-wider text-accent">
        Colors <span className="text-gray-400 text-[10px] ml-1">({activePart})</span>
      </h3>
      
      <div className="grid grid-cols-5 gap-2">
        {FIELDS[activePart].map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`h-10 rounded-lg border-2 transition ${
              active === f.key ? "border-accent scale-110" : "border-transparent"
            }`}
            style={{ background: store[f.key] || "#ffffff" }}
            title={f.label}
          />
        ))}
      </div>
      
      <p className="text-xs text-gray-400">
        {FIELDS[activePart].find(f => f.key === active)?.label || "Color"}
      </p>
      
      <HexColorPicker
        color={currentColor}
        onChange={(c) => store.setColor(active, c)}
        style={{ width: "100%" }}
      />
      
      <input
        type="text"
        value={currentColor}
        onChange={(e) => store.setColor(active, e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-md px-2 py-1 text-sm uppercase"
      />
    </div>
  );
}