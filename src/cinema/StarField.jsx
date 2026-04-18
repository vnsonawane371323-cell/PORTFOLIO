import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function StarField() {
  const meshRef = useRef()
  
  const { positions, colors, sizes } = useMemo(() => {
    const count = 3000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
        const r = 2000
        const theta = Math.random() * Math.PI
        const phi = Math.random() * 2 * Math.PI
        
        positions[i*3] = r * Math.sin(theta) * Math.cos(phi)
        positions[i*3+1] = r * Math.sin(theta) * Math.sin(phi)
        positions[i*3+2] = r * Math.cos(theta)
        
        const c = Math.random()
        if (c < 0.7) {
            colors[i*3] = 1; colors[i*3+1] = 1; colors[i*3+2] = 1;
        } else if (c < 0.9) {
            colors[i*3] = 0.8; colors[i*3+1] = 0.9; colors[i*3+2] = 1;
        } else {
            colors[i*3] = 0; colors[i*3+1] = 1; colors[i*3+2] = 0.6;
        }
        
        sizes[i] = Math.random() * 2.5 + 0.5
    }
    return { positions, colors, sizes }
  }, [])
  
  useFrame(() => {
    if (meshRef.current) {
        meshRef.current.rotation.y += 0.00008
        meshRef.current.rotation.x += 0.00003
    }
  })
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial vertexColors sizeAttenuation transparent opacity={0.9} size={1.5} />
    </points>
  )
}
