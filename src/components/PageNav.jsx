import { Link } from 'react-router-dom'
import './PageNav.css'

export default function PageNav() {
  return (
    <nav className="page-nav">
      <Link className="page-nav-logo" to="/" aria-label="Vedant Sonawane home">
        VS
      </Link>
      <div className="page-nav-links">
        <Link to="/" className="page-nav-link">Home</Link>
        <Link to="/about-vedant-sonawane" className="page-nav-link">About</Link>
        <Link to="/projects" className="page-nav-link">Projects</Link>
        <Link to="/blog" className="page-nav-link">Blog</Link>
      </div>
    </nav>
  )
}
