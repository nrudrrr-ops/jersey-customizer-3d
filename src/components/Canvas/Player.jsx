import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'
import { useStore } from '../../store/useStore' // Color Picker se jodane ke liye

export function Model(props) {
  const { scene } = useGLTF('/player.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)

  // 1. Aapke right side wale Color Picker (UI) se color nikal rahe hain
  const primaryColor = useStore((state) => state.primaryColor) || "#ff0000"

  // 2. Purple wali photo (Fabric Texture) load kar rahe hain
  const fabricMap = useTexture('/fabric.jpg')
  fabricMap.wrapS = fabricMap.wrapT = THREE.RepeatWrapping
  fabricMap.repeat.set(8, 8) // Texture ke chhed (mesh) ka size

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <primitive object={nodes._rootJoint} />
        
        {/* 🔥 T-SHIRT WALA HISSA (Object_9) 🔥 */}
        <skinnedMesh geometry={nodes.Object_9.geometry} skeleton={nodes.Object_9.skeleton}>
          <meshStandardMaterial 
            color={primaryColor} // UI se aane wala color
            normalMap={fabricMap} // Purple jaali wali photo
            normalScale={new THREE.Vector2(5, 5)} // Texture ki gehraai
            roughness={0.8} // Kapda banaye, plastic nahi
          />
        </skinnedMesh>

        {/* Baaki hisse (Shorts, Socks) - Inse test colors hata diye hain taaki clean dikhe */}
        <skinnedMesh geometry={nodes.Object_10.geometry} material={materials.texture_8} skeleton={nodes.Object_10.skeleton} />
        <skinnedMesh geometry={nodes.Object_11.geometry} material={materials.texture_5} skeleton={nodes.Object_11.skeleton} />
        <skinnedMesh geometry={nodes.Object_12.geometry} material={materials.texture_3} skeleton={nodes.Object_12.skeleton} />
        <skinnedMesh geometry={nodes.Object_13.geometry} material={materials.texture_4} skeleton={nodes.Object_13.skeleton} />
        <skinnedMesh geometry={nodes.Object_14.geometry} material={materials.texture_6} skeleton={nodes.Object_14.skeleton} />
        <skinnedMesh geometry={nodes.Object_15.geometry} material={materials.texture_1} skeleton={nodes.Object_15.skeleton} />
        <skinnedMesh geometry={nodes.Object_16.geometry} material={materials.texture_7} skeleton={nodes.Object_16.skeleton} />
        <skinnedMesh geometry={nodes.Object_17.geometry} material={materials.texture_9} skeleton={nodes.Object_17.skeleton} material-color="black" />
      </group>
    </group>
  )
}

useGLTF.preload('/player.glb')