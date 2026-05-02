import { create } from "zustand";

export const useStore = create((set) => ({
  activePart: "shirt",
  style: "solid",

  primaryColor: "#e63946",
  secondaryColor: "#1d3557",
  trimColor: "#ffffff",
  sponsorColor: "#ffffff", 
  numberColor: "#ffffff",
  
  shortsColor: "#ffffff", 
  socksColor: "#1d3557",  

  // 🔥 NAYE TEXT VARIABLES YAHAN HAIN
  teamName: "INDIA",
  playerName: "RUDR",
  number: "111",

  setColor: (key, color) => set({ [key]: color }),
  setActivePart: (part) => set({ activePart: part }),
  setStyle: (newStyle) => set({ style: newStyle }),
  
  // 🔥 TEXT KO LIVE UPDATE KARNE KE FUNCTIONS
  setTeamName: (val) => set({ teamName: val }),
  setPlayerName: (val) => set({ playerName: val }),
  setNumber: (val) => set({ number: val }),
}));