import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useMagnet from '../../hooks/useMagnet'
import './Hero.css'

// ADD YOUR REAL PHOTO HERE — replace with your actual image path
import heroPhoto from '../../assets/photo.svg'

const roles = ['Frontend Developer', 'Design Thinker', 'React.js Expert', 'Problem Solver']

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const [typed, setTyped] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [photoError, setPhotoError] = useState(false)

  const magnet1 = useMagnet()
  const magnet2 = useMagnet()

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIdx]
    let timeout

    if (!deleting && typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 80)
    } else if (!deleting && typed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 45)
    } else if (deleting && typed.length === 0) {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [typed, deleting, roleIdx])

  return (
    <section id="hero" className="hero">
      <div className="hero-inner">

        {/* ── PHOTO CARD ── */}
        <motion.div className="hero-photo-wrap" {...fadeUp(0.1)}>
          <div className="hero-status">
            <span className="pulse-dot" />
            Available for Internship
          </div>

          <div className="photo-frame">
            {!photoError ? (
              <img
                src={heroPhoto}
                alt="Vedant Sonawane"
                onError={() => setPhotoError(true)}
                className="photo-img"
              />
            ) : (
              <div className="photo-fallback">
                <div className="photo-initials">VS</div>
                <p className="photo-name-text">Vedant Sonawane</p>
                <p className="photo-role-text">Frontend Developer</p>
                <p className="photo-hint">Replace src/assets/photo.svg with your photo</p>
              </div>
            )}
            <div className="photo-overlay" />
          </div>

          <div className="badge-float bf1">⚡ React.js</div>
          <div className="badge-float bf2">🎨 Figma</div>
          <div className="badge-float bf3">☁️ AWS</div>
        </motion.div>

        {/* ── HERO TEXT ── */}
        <div className="hero-text">
          <motion.div className="hero-badge" {...fadeUp(0.3)}>
            <span className="pulse-dot" />
            KK Wagh Institute · CS & Design Engineering · 3rd Year
          </motion.div>

          <motion.h1 className="hero-headline" {...fadeUp(0.5)}>
            <span className="h-line1">VEDANT</span>
            <span className="h-line2 grad-text">SONAWANE</span>
          </motion.h1>

          <motion.div className="typewriter-row" {...fadeUp(0.7)}>
            <span className="tw-text">{typed}</span>
            <span className="tw-cursor">|</span>
          </motion.div>

          <motion.p className="hero-desc" {...fadeUp(0.85)}>
            Crafting web experiences where logic meets aesthetics —
            building products that are technically sound and beautifully designed.
          </motion.p>

          <motion.div className="hero-btns" {...fadeUp(1)}>
            <a
              href="#projects"
              className="btn-primary"
              ref={magnet1.ref}
              onMouseMove={magnet1.onMouseMove}
              onMouseLeave={magnet1.onMouseLeave}
              onMouseEnter={magnet1.onMouseEnter}
            >
              View My Work <span className="btn-arrow">→</span>
            </a>
            <a
              href="#contact"
              className="btn-outline"
              ref={magnet2.ref}
              onMouseMove={magnet2.onMouseMove}
              onMouseLeave={magnet2.onMouseLeave}
              onMouseEnter={magnet2.onMouseEnter}
            >
              Get In Touch
            </a>
          </motion.div>

          <motion.div className="hero-stats" {...fadeUp(1.1)}>
            {[
              { num: '🏆', label: 'National Runner-Up', sub: 'Hacksagon 2026' },
              { num: '2+', label: 'Live Projects' },
              { num: '17', label: 'Master Student', sub: 'ISTE 2025' },
              { num: '3rd', label: 'Year · KK Wagh' },
            ].map((s, i) => (
              <div key={i} className="h-stat">
                <div className="h-stat-num">{s.num}</div>
                <div className="h-stat-label">{s.label}</div>
                {s.sub && <div className="h-stat-sub">{s.sub}</div>}
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span>SCROLL</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  )
}
