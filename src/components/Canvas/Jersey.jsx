import React, { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "../../store/useStore";

// 👕 Jersey ka Premium Design aur Text Banane wala function
function buildTexture(primary, secondary, trim, style, teamName, playerName, number, sponsorColor, numberColor) {
  const canvas = document.createElement("canvas");
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext("2d");
  
  // ==========================================
  // 🎨 1. BACKGROUND & PATTERN DRAWING
  // ==========================================
  if (style === "solid") { ctx.fillStyle = primary; ctx.fillRect(0, 0, 512, 512); }
  else if (style === "halves") { ctx.fillStyle = primary; ctx.fillRect(0, 0, 256, 512); ctx.fillStyle = secondary; ctx.fillRect(256, 0, 256, 512); }
  else if (style === "stripes") {
    const w = 64;
    for (let x = 0; x < 512; x += w) {
      ctx.fillStyle = Math.floor(x / w) % 2 === 0 ? primary : secondary;
      ctx.fillRect(x, 0, w, 512);
    }
  } else if (style === "gradient") {
    const g = ctx.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, primary);
    g.addColorStop(1, secondary);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
  } else {
    ctx.fillStyle = primary;
    ctx.fillRect(0, 0, 512, 512);
  }
  
  ctx.fillStyle = trim;
  ctx.fillRect(0, 0, 512, 18);

  // ==========================================
  // 🏆 2. PREMIUM TEXT & LOGO DRAWING
  // ==========================================
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // 🔴 A. TEAM NAME (Front Chest) - Seedha rahega
  if (teamName) {
    ctx.fillStyle = sponsorColor;
    ctx.font = "italic 900 35px 'Impact', 'Arial Black', sans-serif";
    ctx.fillText(teamName.toUpperCase(), 256, 380); 
  }

  // 🔴 B. PLAYER NAME (Back Shoulders) - 180 Degree Ghumana hai
  if (playerName) {
    ctx.save(); 
    ctx.fillStyle = numberColor;
    ctx.font = "bold 25px 'Arial Black', sans-serif";
    ctx.translate(256, 100); 
    ctx.rotate(Math.PI); 
    ctx.fillText(playerName.toUpperCase(), 0, 0); 
    ctx.restore(); 
  }

  // 🔴 C. PLAYER NUMBER (Back Center) - 180 Degree Ghumana hai
  if (number) {
    ctx.save();
    ctx.fillStyle = numberColor;
    ctx.font = "italic 900 80px 'Impact', 'Arial Black', sans-serif";
    ctx.translate(256, 180); 
    ctx.rotate(Math.PI); 
    ctx.fillText(number, 0, 0);
    ctx.restore();
  }

  ctx.shadowColor = "transparent";

  return new THREE.CanvasTexture(canvas);
}

export default function Jersey({ nodes, materials }) {
  // Store se Colors
  const primaryColor   = useStore((s) => s.primaryColor ?? "#e63946");
  const secondaryColor = useStore((s) => s.secondaryColor ?? "#1d3557");
  const trimColor      = useStore((s) => s.trimColor ?? "#ffffff");
  const shortsColor    = useStore((s) => s.shortsColor ?? "#ffffff");
  const socksColor     = useStore((s) => s.socksColor ?? "#1d3557");
  const sponsorColor   = useStore((s) => s.sponsorColor ?? "#ffffff");
  const numberColor    = useStore((s) => s.numberColor ?? "#ffffff");
  const style          = useStore((s) => s.style ?? "solid");

  // Store se Text Data
  const teamName       = useStore((s) => s.teamName ?? "INDIA");
  const playerName     = useStore((s) => s.playerName ?? "RUDR");
  const number         = useStore((s) => s.number ?? "111");

  // Kapde ki jaali (Normal Map)
  const fabricNormal = useTexture("/fabric.jpg");
  useEffect(() => {
    if (fabricNormal) {
      fabricNormal.wrapS = fabricNormal.wrapT = THREE.RepeatWrapping;
      fabricNormal.repeat.set(10, 10);
      fabricNormal.needsUpdate = true;
    }
  }, [fabricNormal]);

  // 🔥 Yahan Color Brightness fix kiya gaya hai (SRGBColorSpace)
  const jerseyTexture = useMemo(() => {
    const texture = buildTexture(primaryColor, secondaryColor, trimColor, style, teamName, playerName, number, sponsorColor, numberColor);
    texture.colorSpace = THREE.SRGBColorSpace; // Isse color bright aur match hoga
    return texture;
  }, [primaryColor, secondaryColor, trimColor, style, teamName, playerName, number, sponsorColor, numberColor]);

  // 1. Jersey Material
  const jerseyMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: jerseyTexture,
      normalMap: fabricNormal,
      normalScale: new THREE.Vector2(3, 3),
      roughness: 0.8,
      metalness: 0.0,
    });
  }, [jerseyTexture, fabricNormal]);

  // 2. Shorts Material
  const shortsMat = useMemo(() => new THREE.MeshStandardMaterial({ color: shortsColor, roughness: 0.8, metalness: 0.0 }), [shortsColor]);
  
  // 3. Socks Material
  const socksMat = useMemo(() => new THREE.MeshStandardMaterial({ color: socksColor, roughness: 0.8, metalness: 0.0 }), [socksColor]);

  // 4. Fixed Materials
  const hairMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.9, metalness: 0.0 }), []);
  const skinMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#c68642", roughness: 0.8, metalness: 0.0 }), []);
  const shoesMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.9, metalness: 0.1 }), []);
  const eyesMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.5, metalness: 0.0 }), []);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <primitive object={nodes._rootJoint} />
      
      {/* 9: Hair */}
      <skinnedMesh geometry={nodes.Object_9.geometry} skeleton={nodes.Object_9.skeleton} material={hairMat} />
      
      {/* 10: Socks */}
      <skinnedMesh geometry={nodes.Object_10.geometry} skeleton={nodes.Object_10.skeleton} material={socksMat} />
      
      {/* 11: Eyes / Aankhein */}
      <skinnedMesh geometry={nodes.Object_11.geometry} skeleton={nodes.Object_11.skeleton} material={eyesMat} />
      
      {/* 12: Haath / Arms */}
      <skinnedMesh geometry={nodes.Object_12.geometry} skeleton={nodes.Object_12.skeleton} material={skinMat} />
      
      {/* 13: Taang / Legs */}
      <skinnedMesh geometry={nodes.Object_13.geometry} skeleton={nodes.Object_13.skeleton} material={skinMat} />
      
      {/* 14: Asli Jersey / T-Shirt */}
      <skinnedMesh geometry={nodes.Object_14.geometry} skeleton={nodes.Object_14.skeleton} material={jerseyMat} castShadow />
      
      {/* 15: Face / Head */}
      <skinnedMesh geometry={nodes.Object_15.geometry} skeleton={nodes.Object_15.skeleton} material={skinMat} />
      
      {/* 16: Asli Shorts */}
      <skinnedMesh geometry={nodes.Object_16.geometry} skeleton={nodes.Object_16.skeleton} material={shortsMat} />
      
      {/* 17: Shoes */}
      <skinnedMesh geometry={nodes.Object_17.geometry} skeleton={nodes.Object_17.skeleton} material={shoesMat} />
    </group>
  );
}