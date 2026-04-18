import React, { useEffect, useRef } from 'react'
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
