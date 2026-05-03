import React from 'react'
import { motion } from 'framer-motion'
import useStoryProgress from '../useStoryProgress'

export default function NashikOverlay() {
  const { nashikOpacity } = useStoryProgress()
  return (
    <motion.div style={{ opacity: nashikOpacity, position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontWeight: 800, background: 'linear-gradient(135deg, #00f5a0, #00d9f5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center' }}>
            Nashik, Maharashtra
        </h2>
        <p style={{ color: 'white', marginTop: '1rem', letterSpacing: '0.1em' }}>— where Vedant builds —</p>
    </motion.div>
  )
}
