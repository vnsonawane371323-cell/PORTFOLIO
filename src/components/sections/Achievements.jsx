import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { achievements } from '../../data/index.js'
import './Achievements.css'

export default function Achievements() {
  const bannerRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import('canvas-confetti').then(({ default: confetti }) => {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.5 },
              colors: ['#00f5a0', '#00d9f5', '#7b2fff', '#ffffff'],
            })
          })
          obs.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (bannerRef.current) obs.observe(bannerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="achievements" className="section-pad ach-section">
      <div className="ach-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">Milestones</div>
          <h2 className="section-title">Achievements</h2>
          <p className="section-sub">Moments that define the journey so far.</p>
        </motion.div>

        {/* BIG TROPHY BANNER */}
        <motion.div
          ref={bannerRef}
          className="ach-banner"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="banner-glow" />
          <div className="trophy-wrap">🏆</div>
          <div className="banner-text">
            <h2>National Runner-Up — Hacksagon 2026</h2>
            <p>Competed against top teams across India at Hacksagon, organised by IIIT Gwalior — and secured National Runner-Up position.</p>
            <a 
              href="https://www.linkedin.com/posts/vedant-sonawane-57012a337_hacksagon2026-hackathon-firsthackathon-activity-7448666212894527488-Rzun?utm_source=share&utm_medium=member_android&rcm=ACoAAFSO5KQBMpxkC7g9xkwhy-Er1Z-Wg-nc0jU" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ach-view-btn"
              style={{ marginTop: '1rem' }}
            >
              View <span className="ach-arrow">↗</span>
            </a>
          </div>
          <div className="banner-badge">IIIT Gwalior</div>
        </motion.div>

        {/* ACHIEVEMENT CARDS */}
        <div className="ach-grid">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              className="card ach-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="ach-icon">{a.icon}</div>
              <div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                {a.link && (
                  <a href={a.link} target="_blank" rel="noopener noreferrer" className="ach-view-btn">
                    View <span className="ach-arrow">↗</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
