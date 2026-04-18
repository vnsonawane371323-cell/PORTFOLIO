import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Loader.css'

export default function Loader({ onComplete }) {
  const [pct, setPct] = useState(0)
  const [phase, setPhase] = useState(0) // 0=vs, 1=bar, 2=name, 3=exit

  useEffect(() => {
    // Phase 1: show VS (0–800ms)
    const t1 = setTimeout(() => setPhase(1), 800)

    // Phase 2: count up (900ms–2700ms)
    let count = 0
    const t2 = setTimeout(() => {
      const interval = setInterval(() => {
        count += 2
        setPct(count)
        if (count >= 100) {
          clearInterval(interval)
          setPhase(2)
        }
      }, 18)
      return () => clearInterval(interval)
    }, 900)

    // Phase 3: show name (2700ms)
    const t3 = setTimeout(() => setPhase(3), 2700)

    // Phase 4: exit (3400ms)
    const t4 = setTimeout(() => onComplete(), 3800)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="loader"
        exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      >
        <motion.div
          className="loader-vs"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          VS
        </motion.div>

        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              className="loader-bar-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="loader-bar" style={{ width: `${pct}%` }} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="loader-pct"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
        >
          {pct}%
        </motion.div>

        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              className="loader-name"
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ duration: 0.6 }}
            >
              VEDANT SONAWANE
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
