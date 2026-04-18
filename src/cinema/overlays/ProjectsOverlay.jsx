import React from 'react'
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
