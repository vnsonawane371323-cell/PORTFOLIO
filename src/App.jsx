import React, { Suspense, lazy, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StoryProgress from './cinema/StoryProgress'
import ErrorBoundary from './components/ErrorBoundary'

import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Achievements from './components/sections/Achievements'
import Certifications from './components/sections/Certifications'
import Contact from './components/sections/Contact'
import Hero from './components/sections/Hero'
import ParticleField from './canvas/ParticleField'

const ScrollStory = lazy(() => import('./cinema/ScrollStory'))

const Divider = () => (
  <div style={{
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(0,245,160,0.18), transparent)',
    position: 'relative',
    zIndex: 1,
  }} />
)

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let lenis
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    })
    return () => lenis?.destroy()
  }, [])

  return (
    <>
      <Cursor />

      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <ErrorBoundary>
          <Suspense fallback={<div style={{background:'#000000',height:'100vh'}}/>}>
            <Navbar />
            <StoryProgress />
            <ScrollStory />
            
            <main style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
              <ParticleField />
              <Hero />
              <Divider />
              <About />
              <Divider />
              <Skills />
              <Divider />
              <Projects />
              <Divider />
              <Experience />
              <Divider />
              <Achievements />
              <Divider />
              <Certifications />
              <Divider />
              <Contact />
            </main>
            
            <Footer />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  )
}
