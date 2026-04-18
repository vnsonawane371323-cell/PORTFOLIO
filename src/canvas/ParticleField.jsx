import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    let mouse = { x: 0, y: 0 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    const init = () => {
      particles = []
      const count = Math.floor((canvas.width * canvas.height) / 10000)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.4,
          opacity: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.6 ? '#00f5a0' : Math.random() > 0.5 ? '#00d9f5' : '#7b2fff',
        })
      }
    }

    const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMouse)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid lines
      ctx.strokeStyle = 'rgba(0,245,160,0.025)'
      ctx.lineWidth = 0.5
      const gs = 90
      for (let x = 0; x < canvas.width; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }

      particles.forEach((p, i) => {
        // Mouse repulsion
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 130) {
          p.vx -= (dx / dist) * 0.03
          p.vy -= (dy / dist) * 0.03
        }

        p.x += p.vx; p.y += p.vy
        p.vx *= 0.99; p.vy *= 0.99
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1

        // Connect nearby
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0,245,160,${0.07 * (1 - d / 110)})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 0,
        opacity: 0.55, pointerEvents: 'none',
      }}
    />
  )
}
