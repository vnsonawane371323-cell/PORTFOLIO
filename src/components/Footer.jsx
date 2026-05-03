import { FaTrophy } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">© 2026 Vedant Sonawane — Built with React, Framer Motion &amp; passion</p>
        <div className="footer-badge">
          <FaTrophy style={{ color: '#ffd700', marginRight: '6px' }} />
          National Runner-Up · Hacksagon 2026
        </div>
        <button
          className="back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ Top
        </button>
      </div>
    </footer>
  )
}
