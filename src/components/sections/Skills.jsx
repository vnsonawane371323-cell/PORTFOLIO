import { useEffect, useRef, useState } from 'react'
import './Skills.css'

const row1Skills = [
  { icon: "⚡", name: "HTML", cat: "frontend" },
  { icon: "🎨", name: "CSS", cat: "frontend" },
  { icon: "🌐", name: "JavaScript", cat: "frontend" },
  { icon: "⚛️", name: "React.js", cat: "frontend" },
  { icon: "▲", name: "Next.js", cat: "frontend" },
  { icon: "🔷", name: "TypeScript", cat: "frontend" },
  { icon: "🐙", name: "Git", cat: "frontend" },
  { icon: "💻", name: "GitHub", cat: "frontend" }
]

const row2Skills = [
  { icon: "🎯", name: "Figma", cat: "design" },
  { icon: "🖌️", name: "Canva", cat: "design" },
  { icon: "🧠", name: "Design Thinking", cat: "design" },
  { icon: "📐", name: "UI/UX", cat: "design" },
  { icon: "🔲", name: "Prototyping", cat: "design" },
  { icon: "✏️", name: "Wireframing", cat: "design" },
  { icon: "📱", name: "Responsive Design", cat: "design" },
  { icon: "🎭", name: "User Research", cat: "design" }
]

const row3Skills = [
  { icon: "☁️", name: "AWS", cat: "cloud" },
  { icon: "🐍", name: "Python", cat: "cloud" },
  { icon: "⚙️", name: "C++", cat: "cloud" },
  { icon: "🟢", name: "Node.js", cat: "cloud" },
  { icon: "🔗", name: "REST API", cat: "cloud" },
  { icon: "🤖", name: "Claude AI", cat: "cloud" },
  { icon: "💬", name: "Prompt Engineering", cat: "cloud" },
  { icon: "🧮", name: "DSA", cat: "cloud" }
]

const planetsData = [
  { name: "React.js", icon: "⚛️", color: "#00f5a0", orbit: 155, duration: 8, startAngle: 0 },
  { name: "Next.js", icon: "▲", color: "#ffffff", orbit: 155, duration: 8, startAngle: 180 },
  { name: "Figma", icon: "🎯", color: "#00d9f5", orbit: 210, duration: 12, startAngle: 60 },
  { name: "JavaScript", icon: "🌐", color: "#f7df1e", orbit: 210, duration: 12, startAngle: 240 },
  { name: "AWS", icon: "☁️", color: "#ff9900", orbit: 265, duration: 16, startAngle: 120 },
  { name: "Python", icon: "🐍", color: "#7b2fff", orbit: 265, duration: 16, startAngle: 300 },
  { name: "CSS", icon: "🎨", color: "#00d9f5", orbit: 155, duration: 20, startAngle: 90 },
  { name: "Design Thinking", icon: "🧠", color: "#c4a8ff", orbit: 210, duration: 20, startAngle: 270 }
]

function SkillChip({ icon, name, cat }) {
  const catColor = cat === 'frontend' ? '#00f5a0' : cat === 'design' ? '#00d9f5' : '#7b2fff'
  return (
    <div className="skill-chip">
      <span style={{ fontSize: '1.3rem' }}>{icon}</span>
      <span style={{ fontFamily: 'Syne', fontSize: '0.88rem', fontWeight: 600, color: '#e8eaf6' }}>{name}</span>
      <div className="chip-dot" style={{ backgroundColor: catColor }} />
    </div>
  )
}

function MarqueeRow({ skills, direction, speed }) {
  const array = [...skills, ...skills]
  const animName = direction === 'left' ? 'marquee-left' : 'marquee-right'
  return (
    <div className="marquee-row">
      <div className="marquee-track" style={{ animation: `${animName} ${speed}s linear infinite` }}>
        {array.map((sk, i) => (
          <SkillChip key={i} icon={sk.icon} name={sk.name} cat={sk.cat} />
        ))}
      </div>
    </div>
  )
}

function OrbitSystem() {
  const containerRef = useRef(null)
  const requestRef = useRef()
  const anglesRef = useRef(planetsData.map(p => (p.startAngle * Math.PI) / 180))
  
  const [positions, setPositions] = useState(planetsData.map(() => ({ x: 0, y: 0 })))
  const [isPaused, setIsPaused] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let lastTime = performance.now()

    const animate = (time) => {
      const delta = Math.min(time - lastTime, 50)
      lastTime = time

      if (!isPaused && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const newPositions = planetsData.map((p, i) => {
          anglesRef.current[i] += (delta * 2 * Math.PI) / (p.duration * 1000)
          const angle = anglesRef.current[i]
          return {
            x: centerX + p.orbit * Math.cos(angle),
            y: centerY + p.orbit * Math.sin(angle)
          }
        })
        setPositions(newPositions)
      }
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [isPaused])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const tiltX = -(y / (rect.height / 2)) * 8
    const tiltY = (x / (rect.width / 2)) * 8
    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsPaused(false)
  }

  return (
    <div className="orbit-container" 
         onMouseMove={handleMouseMove}
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={handleMouseLeave}>
      <div className="orbit-system" ref={containerRef} style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
        <div className="orbit-ring" style={{ width: '200px', height: '200px', border: '1px solid rgba(0,245,160,0.08)' }} />
        <div className="orbit-ring" style={{ width: '310px', height: '310px', border: '1px solid rgba(0,217,245,0.07)' }} />
        <div className="orbit-ring" style={{ width: '420px', height: '420px', border: '1px solid rgba(123,47,255,0.07)' }} />
        <div className="orbit-ring" style={{ width: '530px', height: '530px', border: '1px solid rgba(0,245,160,0.05)' }} />
        
        <div className="orbit-sun">
          VS
          <div className="sun-ring" />
        </div>

        {planetsData.map((p, i) => (
          <div key={i} className="planet" style={{ 
            left: `${positions[i].x}px`, 
            top: `${positions[i].y}px`,
            borderColor: `${p.color}30`,
            boxShadow: `0 0 12px ${p.color}25`
          }}>
            <span style={{ fontSize: '1.2rem' }}>{p.icon}</span>
            <span style={{ fontSize: '0.45rem', color: '#6b7a99', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '48px' }}>
              {p.name}
            </span>
            <div className="planet-tooltip">{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad skills-section">
      
      {/* Section Header */}
      <div className="skills-header">
        <div className="section-tag" style={{justifyContent:'center'}}>What I Know</div>
        <h2 className="section-title">Skills & <span className="grad-text">Tech Stack</span></h2>
        <p style={{color:'#6b7a99', textAlign:'center', maxWidth:'500px', margin:'0 auto'}}>
          A blend of frontend development, design, and cloud tools that let me 
          build complete, user-centric digital products.
        </p>
      </div>

      {/* PART 1: Marquee rows */}
      <div className="marquee-section">
        <MarqueeRow skills={row1Skills} direction="left" speed={35} />
        <MarqueeRow skills={row2Skills} direction="right" speed={28} />
        <MarqueeRow skills={row3Skills} direction="left" speed={22} />
      </div>

      {/* Divider between marquee and orbit */}
      <div style={{
        textAlign:'center', margin:'4rem 0 0',
        display:'flex', alignItems:'center', gap:'1.5rem', justifyContent:'center'
      }}>
        <div style={{height:'1px',width:'80px',background:'linear-gradient(90deg,transparent,rgba(0,245,160,0.3))'}}/>
        <span style={{fontSize:'0.72rem',letterSpacing:'0.2em',color:'#00f5a0',textTransform:'uppercase'}}>
          Core Skills
        </span>
        <div style={{height:'1px',width:'80px',background:'linear-gradient(90deg,rgba(0,245,160,0.3),transparent)'}}/>
      </div>

      {/* PART 2: Orbit */}
      <OrbitSystem />

    </section>
  )
}
