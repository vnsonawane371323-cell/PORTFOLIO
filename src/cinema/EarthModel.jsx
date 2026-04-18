import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function EarthModel() {
  const earthRef = useRef()
  
  useFrame(({ clock }) => {
    if(earthRef.current) {
        earthRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })
  
  return (
    <group ref={earthRef} scale={[window.storyProgress > 0.15 ? 1 : 0, window.storyProgress > 0.15 ? 1 : 0, window.storyProgress > 0.15 ? 1 : 0]} position={[0,0,0]}>
      <mesh>
        <sphereGeometry args={[10, 64, 64]} />
        <meshStandardMaterial color="#1a4a9a" roughness={0.6} />
      </mesh>
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial color="#1a4a9a" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}
