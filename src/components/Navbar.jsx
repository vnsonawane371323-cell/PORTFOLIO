import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'

const links = ['About', 'Skills', 'Projects', 'Experience', 'Achievements', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(l => document.getElementById(l.toLowerCase()))
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.5 }
    )
    sections.forEach(s => s && obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="nav-logo">VS</div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map(link => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className={active === link.toLowerCase() ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link}
              {active === link.toLowerCase() && (
                <motion.span className="nav-underline" layoutId="underline" />
              )}
            </a>
          </li>
        ))}
      </ul>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
        <span className={menuOpen ? 'open' : ''} />
        <span className={menuOpen ? 'open' : ''} />
        <span className={menuOpen ? 'open' : ''} />
      </button>
    </motion.nav>
  )
}
