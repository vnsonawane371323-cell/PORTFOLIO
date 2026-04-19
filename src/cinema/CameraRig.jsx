import React, { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CameraRig() {
  const { camera } = useThree()
  const scrollRef = useRef(0)
  
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = Math.max(0, Math.min(1, scrolled / maxScroll))
      window.storyProgress = scrollRef.current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  
  const keyframes = [
    { progress: 0.0, pos: [0, 40, 200], lookAt: [0, 0, 0] },
    { progress: 0.1, pos: [20, -10, 100], lookAt: [0, 0, 0] },
    { progress: 0.2, pos: [5, 5, 40], lookAt: [0, 0, 0] },
    { progress: 0.4, pos: [12, 4, 25], lookAt: [4, 2, 8] },
    { progress: 0.55, pos: [7, 4, 14], lookAt: [6, 3.4, 9.2] },
    { progress: 0.80, pos: [0, 5, 55], lookAt: [0, 0, 0] },
    { progress: 1.00, pos: [0, 0, 40], lookAt: [0, 0, 0] },
  ]
  
  useFrame(() => {
    const p = scrollRef.current
    let prev = keyframes[0]
    let next = keyframes[keyframes.length - 1]
    
    for(let i=0; i<keyframes.length-1; i++) {
        if(p >= keyframes[i].progress && p <= keyframes[i+1].progress) {
            prev = keyframes[i]
            next = keyframes[i+1]
            break
        }
    }
    
    const range = next.progress - prev.progress
    const t = range === 0 ? 0 : (p - prev.progress) / range
    const easedT = t * t * (3 - 2*t)
    
    camera.position.lerp(new THREE.Vector3(...prev.pos).lerp(new THREE.Vector3(...next.pos), easedT), 0.1)
    
    const lookAtVec = new THREE.Vector3(...prev.lookAt).lerp(new THREE.Vector3(...next.lookAt), easedT)
    camera.lookAt(lookAtVec)
  })
  
  return null
}
