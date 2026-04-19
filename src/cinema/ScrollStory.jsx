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
      <div className="story-pin" style={{ position: 'sticky', top: 0, height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <CinemaEngine />
        <NashikOverlay />
        <ProjectsOverlay />
        <CTAOverlay />
      </div>
    </div>
  )
}
