import { useEffect } from 'react'
import './Cursor.css'

export default function Cursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let animId

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
    }

    const lerp = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      animId = requestAnimationFrame(lerp)
    }

    document.addEventListener('mousemove', onMove)
    lerp()

    const addHover = () => {
      document.querySelectorAll('a, button, .card, .proj-card, .sk-card, .cert-card, .clink').forEach(el => {
        el.addEventListener('mouseenter', () => {
          dot.classList.add('hovered')
          ring.classList.add('hovered')
        })
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('hovered')
          ring.classList.remove('hovered')
        })
      })
    }

    // Run after DOM settles
    setTimeout(addHover, 1000)

    const onClick = () => {
      dot.classList.add('clicked')
      setTimeout(() => dot.classList.remove('clicked'), 300)
    }
    document.addEventListener('mousedown', onClick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onClick)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  )
}
