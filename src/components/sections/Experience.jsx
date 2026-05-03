import { motion } from 'framer-motion'
import { experiences } from '../../data/index.jsx'
import './Experience.css'

function Timeline({ items, delay = 0 }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="t-item"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + i * 0.12 }}
        >
          <div className="t-dot" />
          <div className="t-date">{item.date}</div>
          <h3 className="t-title">{item.title}</h3>
          <h4 className="t-org">{item.org}</h4>
          <p className="t-desc">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-pad exp-section">
      <div className="exp-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">Roles &amp; Responsibilities</div>
          <h2 className="section-title">Experience &amp; <span className="grad-text">Journey</span></h2>
          <p className="section-sub">Leadership roles and co-curricular activities that shaped who I am.</p>
        </motion.div>

        <div className="exp-grid">
          <div>
            <p className="exp-col-label">Positions of Responsibility</p>
            <Timeline items={experiences.left} delay={0.1} />
          </div>
          <div>
            <p className="exp-col-label">Co-Curricular &amp; Achievements</p>
            <Timeline items={experiences.right} delay={0.2} />
          </div>
        </div>
      </div>
    </section>
  )
}
