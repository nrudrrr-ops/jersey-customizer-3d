import React, { Suspense, useMemo } from "react";
import { Canvas, useGraph } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import Jersey from "./Jersey";

function PlayerModel(props) {
  const { scene } = useGLTF('/player.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  return (
    <group {...props} dispose={null}>
      <Jersey nodes={nodes} materials={materials} />
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [0, 1, 3.5], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 2, 5]} intensity={1.2} castShadow />
      
      <Suspense fallback={null}>
        <Stage intensity={0.5} environment="city" adjustCamera={false}>
          <PlayerModel scale={0.028} position={[0, -1.8, 0]} />
        </Stage>
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={true}
        minDistance={1.5}
        maxDistance={10}
        target={[0, 1, 0]}
      />
    </Canvas>
  );
}

useGLTF.preload('/player.glb');
