import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function EarthModel() {
  const pointsRef = useRef()

  // Generate Galaxy Particles
  const { positions, colors, sizes } = useMemo(() => {
    const parameters = {
      count: 20000,
      size: 0.15,
      radius: 120,
      branches: 4,
      spin: 1.5,
      randomness: 4.0,
      randomnessPower: 3.5,
      insideColor: '#b24bf3',
      outsideColor: '#00d9f5'
    }

    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const sizes = new Float32Array(parameters.count)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for(let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius * 0.1
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius * 0.1
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius * 0.1

        positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3    ] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b

        sizes[i] = Math.random() * 2.0 + 0.5
    }

    return { positions, colors, sizes }
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      // Base rotation
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05

      // Interpolate position and scale based on scroll from 0 to 0.3
      const progress = window.storyProgress || 0
      
      let scale = 1
      if(progress < 0.3) {
        // Expand the galaxy as we scroll down to 30%
        scale = 1 + progress * 5
      } else {
        // Past 30% keep it expanded, or fade out etc
        scale = 1 + 0.3 * 5
      }

      // Smoothly update scale
      pointsRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)

      // Optionally fade out or explode as progress goes beyond 0.30
      let opacity = 1
      if (progress > 0.25) {
         opacity = Math.max(0, 1 - (progress - 0.25) * 5)
      }
      pointsRef.current.material.opacity = THREE.MathUtils.lerp(pointsRef.current.material.opacity, opacity, 0.1)
    }
  })

  return (
    <group position={[0,0,0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial size={0.5} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} vertexColors={true} transparent={true} opacity={1} />
      </points>
    </group>
  )
}

