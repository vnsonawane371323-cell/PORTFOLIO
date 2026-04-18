import React from 'react'
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
