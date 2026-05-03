import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTrophy, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { achievements } from '../../data/index.jsx'
import './Achievements.css'

export default function Achievements() {
  const bannerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(1);

  // Auto-play the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % achievements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? achievements.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
  };

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

        {/* BIG TROPHY BANNER - RESTORED */}
        <motion.div
          ref={bannerRef}
          className="ach-banner"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="banner-glow" />
          <div className="trophy-wrap"><FaTrophy color="#ffd700" /></div>
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

      </div>

      {/* FULL-WIDTH COVERFLOW CAROUSEL */}
      <div className="ach-carousel-wrapper">
        <div className="carousel-glow"></div>
        
        <button className="carousel-nav-btn prev-btn" onClick={handlePrev}>
          <FaChevronLeft />
        </button>
        <button className="carousel-nav-btn next-btn" onClick={handleNext}>
          <FaChevronRight />
        </button>

        <motion.div 
          className="carousel-track"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -10000 || offset.x < -80) {
              setActiveIndex(Math.min(activeIndex + 1, achievements.length - 1));
            } else if (swipe > 10000 || offset.x > 80) {
              setActiveIndex(Math.max(activeIndex - 1, 0));
            }
          }}
        >
          {achievements.map((a, i) => {
            const isActive = i === activeIndex;
            const offset = i - activeIndex;
            const absOffset = Math.abs(offset);
            const zIndex = 10 - absOffset;
            
            const rotateY = offset === 0 ? 0 : offset > 0 ? -40 : 40;
            const translateX = offset * 240; 
            const translateZ = -absOffset * 120;
            const scale = offset === 0 ? 1 : 0.8;
            const opacity = absOffset > 2 ? 0 : 1 - (absOffset * 0.15);

            return (
              <motion.div
                key={i}
                className={`ach-movie-card ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIndex(i)}
                animate={{
                  rotateY,
                  x: translateX,
                  z: translateZ,
                  scale,
                  opacity
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ zIndex }}
              >
                <div className="card-image">
                  {a.image ? (
                    <img src={a.image} alt="Achievement" />
                  ) : (
                    <div className="card-placeholder" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
