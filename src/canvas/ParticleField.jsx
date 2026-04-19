import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    const init = () => {
      particles = []
      const count = Math.floor((canvas.width * canvas.height) / 4000)
      for (let i = 0; i < count; i++) {
        // Galaxy distributions: mostly clustered in an ellipse
        const radius = Math.random() * Math.max(canvas.width, canvas.height)
        const angle = Math.random() * Math.PI * 2
        particles.push({
          x: canvas.width / 2 + Math.cos(angle) * radius,
          y: canvas.height / 2 + Math.sin(angle) * radius,
          baseX: canvas.width / 2 + Math.cos(angle) * radius,
          baseY: canvas.height / 2 + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          size: Math.random() * 1.5 + 0.2, // Small stars
          opacity: Math.random() * 0.8 + 0.1,
          twinkleSpeed: Math.random() * 0.05 + 0.01,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          color: Math.random() > 0.8 ? '#b24bf3' : Math.random() > 0.6 ? '#00d9f5' : '#ffffff',
          angle: angle,
          distance: radius,
          speed: (Math.random() * 0.0005) + 0.0002
        })
      }
    }

    const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMouse)

    const draw = () => {
      // Very faint trail effect for galaxy motion
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Optional center glow for a core
      const coreGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.height / 1.5
      )
      coreGradient.addColorStop(0, 'rgba(178, 75, 243, 0.03)')
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = coreGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        // Rotate stars around center slowly
        p.angle += p.speed
        p.x = canvas.width / 2 + Math.cos(p.angle) * p.distance
        p.y = canvas.height / 2 + Math.sin(p.angle) * p.distance

        // Mouse parallax shift
        const dx = mouse.x - canvas.width / 2
        const dy = mouse.y - canvas.height / 2
        const parallaxX = p.x - (dx * (p.distance * 0.0002))
        const parallaxY = p.y - (dy * (p.distance * 0.0002))

        // Twinkling effect
        p.opacity += p.twinkleSpeed * p.twinkleDir
        if (p.opacity > 1) { p.opacity = 1; p.twinkleDir = -1 }
        else if (p.opacity < 0.1) { p.opacity = 0.1; p.twinkleDir = 1 }

        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        
        ctx.beginPath()
        ctx.arc(parallaxX, parallaxY, p.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add a soft glow to larger stars
        if (p.size > 1.2) {
            ctx.shadowBlur = 8
            ctx.shadowColor = p.color
            ctx.fill()
            ctx.shadowBlur = 0
        }
        ctx.globalAlpha = 1
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
        position: 'fixed', top: 0, left: 0, zIndex: -1,
        opacity: 0.95, pointerEvents: 'none',
        height: '100vh', width: '100vw'
      }}
    />
  )
}
