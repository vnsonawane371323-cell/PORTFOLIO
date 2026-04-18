import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { certifications } from '../../data/index.js'
import './Certifications.css'

function TiltCard({ cert, delay }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-60, 60], [10, -10])
  const rotateY = useTransform(x, [-60, 60], [-10, 10])

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const onMouseLeave = () => {
    x.set(0); y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="cert-card"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="cert-shimmer" />
      {cert.image && (
          <div 
            className="cert-bg-image" 
            style={{ 
              backgroundImage: `url(${cert.image})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              position: 'absolute', 
              inset: 0, 
              opacity: 0.25,
              borderRadius: 'var(--radius)',
              zIndex: 0,
              pointerEvents: 'none'
            }} 
          />
      )}
      <div className="cert-logo" style={{ background: cert.logoBg, color: cert.logoColor, position: 'relative', zIndex: 1 }}>
        {cert.logo}
      </div>
      <div className="cert-info" style={{ position: 'relative', zIndex: 1 }}>
        <h3>{cert.name}</h3>
        <p className="cert-platform">{cert.platform}</p>
        <p className="cert-desc-text">{cert.desc}</p>
        
        {cert.link && (
          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-view-btn">
            View Certificate ↗
          </a>
        )}
      </div>
      <div className={`cert-status ${cert.done ? 'done' : 'wip'}`} style={{ position: 'relative', zIndex: 1 }}>
        {cert.done ? '✓ Completed' : '⟳ In Progress'}
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="section-pad cert-section">
      <div className="cert-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">Credentials</div>
          <h2 className="section-title">Certifications</h2>
          <p className="section-sub">Continuous learning beyond the classroom.</p>
        </motion.div>

        <div className="cert-grid">
          {certifications.map((cert, i) => (
            <TiltCard key={cert.name} cert={cert} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}
