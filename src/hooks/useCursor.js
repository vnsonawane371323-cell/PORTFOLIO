import { useEffect } from 'react'

export default function useCursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
    }

    const lerp = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      requestAnimationFrame(lerp)
    }

    document.addEventListener('mousemove', onMove)
    lerp()

    // Hover states
    const interactives = document.querySelectorAll('a, button, .card, .proj-card, .skill-card, .cert-card')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('dot-hover')
        ring.classList.add('ring-hover')
      })
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('dot-hover')
        ring.classList.remove('ring-hover')
      })
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
    }
  }, [])
}
