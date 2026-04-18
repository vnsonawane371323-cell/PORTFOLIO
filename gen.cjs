const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const cinemaDir = path.join(srcDir, 'cinema');
const overlaysDir = path.join(cinemaDir, 'overlays');

const files = {
  'src/cinema/ScrollStory.jsx': `import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CinemaEngine from './CinemaEngine'
import NashikOverlay from './overlays/NashikOverlay'
import ProjectsOverlay from './overlays/ProjectsOverlay'
import CTAOverlay from './overlays/CTAOverlay'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollStory() {
  return (
    <div className="story-wrapper" style={{ height: '500vh', position: 'relative' }}>
      <div className="story-pin" style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'
      }}>
        <CinemaEngine />
        <NashikOverlay />
        <ProjectsOverlay />
        <CTAOverlay />
      </div>
      
      <button
        className="skip-btn"
        initial={{ opacity: 0 }}
        onClick={() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 200,
          background: 'rgba(10,15,30,0.8)',
          border: '1px solid rgba(0,245,160,0.2)',
          borderRadius: '50px',
          padding: '0.6rem 1.8rem',
          color: '#6b7a99',
          fontSize: '0.78rem',
          letterSpacing: '0.1em',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
        }}
      >
        SKIP TO PORTFOLIO ↓
      </button>
    </div>
  )
}
`,
  'src/cinema/CinemaEngine.jsx': `import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import StarField from './StarField'
import EarthModel from './EarthModel'
import CameraRig from './CameraRig'
import ProjectParticles from './ProjectParticles'
import Markers from './Markers'

function SceneContent() {
  return (
    <>
      <StarField />
      <EarthModel />
      <Markers />
      <ProjectParticles />
      <CameraRig />
      
      {/* Lighting */}
      <ambientLight intensity={0.1} color="#111122" />
      <pointLight position={[100, 100, 100]} intensity={1} color="#ffffff" />
      <pointLight position={[-50, -50, 50]} intensity={0.5} color="#00f5a0" />
      <pointLight position={[0, 0, 20]} intensity={2} color="#00d9f5" />
      
      {/* Post Processing */}
      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.6} luminanceSmoothing={0.9} radius={0.8} />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.001, 0.001]} />
        <Vignette offset={0.3} darkness={0.7} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </>
  )
}

export default function CinemaEngine() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      camera={{ position: [0, 0, 50], fov: 60, near: 0.1, far: 10000 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        gl.setClearColor('#050810')
      }}
    >
      <SceneContent />
    </Canvas>
  )
}
`,
  'src/cinema/StarField.jsx': `import React, { useRef, useMemo } from 'react'
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
        <bufferAttribute attach="attributes-position" count={positions.length/3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length/3} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial vertexColors sizeAttenuation transparent opacity={0.9} size={1.5} />
    </points>
  )
}
`,
  'src/cinema/EarthModel.jsx': `import React, { useRef } from 'react'
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
`,
  'src/cinema/Markers.jsx': `import React from 'react'

export default function Markers() {
  return null; // Implemented as part of Earth in real layout
}
`,
  'src/cinema/ProjectParticles.jsx': `import React from 'react'
export default function ProjectParticles() {
  return null; // Projects logic setup
}
`,
  'src/cinema/CameraRig.jsx': `import React, { useEffect, useRef } from 'react'
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
    { progress: 0.0, pos: [0, 0, 800], lookAt: [0, 0, 0] },
    { progress: 0.1, pos: [30, 20, 600], lookAt: [0, 0, 0] },
    { progress: 0.2, pos: [0, 0, 150], lookAt: [0, 0, 0] },
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
`,
  'src/cinema/useStoryProgress.js': `import { useState, useEffect } from 'react'

export default function useStoryProgress() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrolled / (maxScroll || 1))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  
  const smoothStep = (e0, e1, x) => {
    const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)))
    return t * t * (3 - 2 * t)
  }
  
  return {
    progress,
    nashikOpacity: smoothStep(0.38, 0.45, progress) - smoothStep(0.52, 0.58, progress),
    projectsOpacity: smoothStep(0.55, 0.62, progress) - smoothStep(0.76, 0.82, progress),
    ctaOpacity: smoothStep(0.80, 0.88, progress),
  }
}
`,
  'src/cinema/StoryProgress.jsx': `import React from 'react'
import useStoryProgress from './useStoryProgress'

export default function StoryProgress() {
    const { progress } = useStoryProgress()
    return (
        <div style={{ position: 'fixed', right: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 100 }}>
            <span style={{ color: '#00f5a0', fontSize:'0.75rem' }}>{Math.round(progress*100)}%</span>
        </div>
    )
}
`,
  'src/cinema/overlays/NashikOverlay.jsx': `import React from 'react'
import { motion } from 'framer-motion'
import useStoryProgress from '../useStoryProgress'

export default function NashikOverlay() {
  const { nashikOpacity } = useStoryProgress()
  return (
    <motion.div style={{ opacity: nashikOpacity, position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
        <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontWeight: 800, background: 'linear-gradient(135deg, #00f5a0, #00d9f5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center' }}>
            Nashik, Maharashtra
        </h1>
        <p style={{ color: 'white', marginTop: '1rem', letterSpacing: '0.1em' }}>— where Vedant builds —</p>
    </motion.div>
  )
}
`,
  'src/cinema/overlays/ProjectsOverlay.jsx': `import React from 'react'
import { motion } from 'framer-motion'
import useStoryProgress from '../useStoryProgress'

export default function ProjectsOverlay() {
  const { projectsOpacity } = useStoryProgress()
  return (
    <motion.div style={{ opacity: projectsOpacity, position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
        <h2 style={{ color: 'white', fontSize: '3rem' }}>What I've Built</h2>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
            <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', backdropFilter:'blur(10px)', color: 'white', border: '1px solid #00f5a0', borderRadius: '12px' }}>Swasthyam</div>
            <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', backdropFilter:'blur(10px)', color: 'white', border: '1px solid #00d9f5', borderRadius: '12px' }}>Lifelink</div>
        </div>
    </motion.div>
  )
}
`,
  'src/cinema/overlays/CTAOverlay.jsx': `import React from 'react'
import { motion } from 'framer-motion'
import useStoryProgress from '../useStoryProgress'

export default function CTAOverlay() {
  const { ctaOpacity } = useStoryProgress()
  return (
    <motion.div style={{ opacity: ctaOpacity, position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
        <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(3rem, 7vw, 8rem)', fontWeight: 800, textAlign: 'center', color: 'white' }}>
            Let's Build the<br/><span style={{ color: '#00f5a0' }}>Future Together</span>
        </h1>
        <div style={{ marginTop: '2rem', pointerEvents: 'auto' }}>
            <a href="#contact" style={{ display: 'inline-block', padding: '1rem 2rem', background: '#00f5a0', color: '#050810', textDecoration: 'none', borderRadius: '30px', fontWeight: 'bold' }}>Get In Touch →</a>
        </div>
    </motion.div>
  )
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}
