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
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        camera={{ position: [0, 1.2, 4], fov: 38 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 2, 5]} intensity={1.2} castShadow />
        <Suspense fallback={null}>
          <Stage intensity={0.5} environment="city" adjustCamera={false}>
            <PlayerModel scale={0.025} position={[0, -2.0, 0]} />
          </Stage>
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          target={[0, 0.5, 0]}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/player.glb');
