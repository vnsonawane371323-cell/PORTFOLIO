import { motion } from 'framer-motion'
import './About.css'
import cvFile from '../../assets/Vedant_Sonawane_Resume.pdf'

const tags = ['React.js','Next.js','JavaScript','TypeScript','AWS','Figma','Canva','Design Thinking','CSS','HTML','Python','C++','Git','GitHub']

export default function About() {
  return (
    <section id="about" className="section-pad about-section">
      <div className="about-grid">

        <motion.div
          className="about-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag">About Me</div>
          <h2 className="section-title">
            Code Meets<br />
            <span className="grad-text">Creativity</span>
          </h2>
          <p className="section-sub">
            A Computer Science &amp; Design Engineering student who thinks like a designer and builds like a developer.
          </p>
          <a href={cvFile} className="btn-outline" download="Vedant_Sonawane_Resume.pdf">Download CV ↓</a>
        </motion.div>

        <motion.div
          className="about-card"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p>
            I'm a 3rd-year <strong>Computer Science and Design Engineering</strong> student at K.K. Wagh Institute of Engineering Education and Research, Nashik. I sit at the intersection of development and design — building things that are both technically solid and visually compelling.
          </p>
          <p>
            My approach is simple: think like a designer, build like a developer. Every project I take on starts with understanding the user and ends with an experience they actually enjoy using.
          </p>
          <p>
            When I'm not building web apps, I'm leading events as <strong>Director of Event Operations at DeSoc</strong>, managing finances at <strong>ISTE</strong>, or competing in national-level hackathons.
          </p>

          <div className="about-tags">
            {tags.map(t => (
              <span key={t} className="a-tag">{t}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
