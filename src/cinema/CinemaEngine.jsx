import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
// import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
// import { BlendFunction } from 'postprocessing'
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
      
      {/* Post Processing 
      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.6} luminanceSmoothing={0.9} />
        <Vignette offset={0.3} darkness={0.7} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
      */}
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
