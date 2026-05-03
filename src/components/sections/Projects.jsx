import { motion } from 'framer-motion'
import { projects } from '../../data/index.jsx'
import './Projects.css'

export default function Projects() {
  return (
    <section id="projects" className="section-pad projects-section">
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-tag">What I've Built</div>
        <h2 className="section-title">Projects</h2>
        <p className="section-sub">
          Real-world problems solved through technology, design, and a lot of late nights.
        </p>
      </motion.div>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            className="proj-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            {/* Visual Header */}
            <div className="proj-visual" style={{ '--proj-color': p.color }}>
              <div className="proj-glow" style={{ background: p.color }} />
              {p.image ? (
                <div 
                  className="proj-bg-image" 
                  style={{ 
                    backgroundImage: `url(${p.image})`,
                  }} 
                />
              ) : (
                <div className="proj-icon" style={{ background: p.iconBg, position: 'relative', zIndex: 2 }}>
                  {p.icon}
                </div>
              )}
              <div className="proj-num" style={{ position: 'relative', zIndex: 2 }}>{p.number}</div>
            </div>

            {/* Body */}
            <div className="proj-body">
              <div className="proj-tag">Project {p.number}</div>
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-sub">{p.subtitle}</p>
              <p className="proj-desc">{p.description}</p>

              <div className="proj-tech">
                {p.tags.map((t) => (
                  <span key={t} className="p-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="proj-foot">
              <a href={p.link} className="proj-link" target="_blank" rel="noreferrer">
                View Project <span className="proj-arrow">→</span>
              </a>
              <span
                className="proj-badge"
                style={{
                  color: p.badgeColor,
                  background: `${p.color}12`,
                  border: `1px solid ${p.color}30`,
                }}
              >
                {p.badge}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
