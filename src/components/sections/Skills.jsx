import { useEffect, useRef, useState } from 'react'
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma, 
  FaPython, FaAws 
} from 'react-icons/fa'
import { TbBrandNextjs, TbBrain, TbSearch, TbBrandThreejs, TbApi } from 'react-icons/tb'
import { BiBrain, BiMessageSquareDetail } from 'react-icons/bi'
import { VscRobot } from 'react-icons/vsc'
import { SiCanva, SiCplusplus, SiTypescript } from 'react-icons/si'
import { MdDesignServices, MdOutlineDesignServices } from 'react-icons/md'
import { BsPhone } from 'react-icons/bs'
import { VscGitPullRequest } from 'react-icons/vsc'
import './Skills.css'

const row1Skills = [
  { icon: <FaHtml5 color="#E34F26" />, name: "HTML", cat: "frontend" },
  { icon: <FaCss3Alt color="#1572B6" />, name: "CSS", cat: "frontend" },
  { icon: <FaJs color="#F7DF1E" />, name: "JavaScript", cat: "frontend" },
  { icon: <FaReact color="#61DAFB" />, name: "React.js", cat: "frontend" },
  { icon: <TbBrandNextjs color="#ffffff" />, name: "Next.js", cat: "frontend" },
  { icon: <SiTypescript color="#3178C6" />, name: "TypeScript", cat: "frontend" },
  { icon: <FaGitAlt color="#F05032" />, name: "Git", cat: "frontend" },
  { icon: <FaGithub color="#ffffff" />, name: "GitHub", cat: "frontend" }
]

const row2Skills = [
  { icon: <FaFigma color="#F24E1E" />, name: "Figma", cat: "design" },
  { icon: <SiCanva color="#00C4CC" />, name: "Canva", cat: "design" },
  { icon: <TbBrain color="#FF66A1" />, name: "Design Thinking", cat: "design" },
  { icon: <MdDesignServices color="#E1218F" />, name: "UI/UX", cat: "design" },
  { icon: <BiBrain color="#00F5A0" />, name: "Prototyping", cat: "design" },
  { icon: <MdOutlineDesignServices color="#FFA500" />, name: "Wireframing", cat: "design" },
  { icon: <BsPhone color="#A020F0" />, name: "Responsive Design", cat: "design" },
  { icon: <TbSearch color="#00D9F5" />, name: "User Research", cat: "design" }
]

const row3Skills = [
  { icon: <FaAws color="#FF9900" />, name: "AWS", cat: "cloud" },
  { icon: <FaPython color="#3776AB" />, name: "Python", cat: "cloud" },
  { icon: <SiCplusplus color="#00599C" />, name: "C++", cat: "cloud" },
  { icon: <FaNodeJs color="#339933" />, name: "Node.js", cat: "cloud" },
  { icon: <TbApi color="#ffffff" />, name: "REST API", cat: "cloud" },
  { icon: <VscRobot color="#5C2D91" />, name: "Claude AI", cat: "cloud" },
  { icon: <BiMessageSquareDetail color="#e8eaf6" />, name: "Prompt Engineering", cat: "cloud" },
  { icon: <VscGitPullRequest color="#00f5a0" />, name: "DSA", cat: "cloud" }
]

const planetsData = [
  { name: "React.js", icon: <FaReact />, color: "#00f5a0", orbit: 155, duration: 8, startAngle: 0 },
  { name: "Next.js", icon: <TbBrandNextjs />, color: "#ffffff", orbit: 155, duration: 8, startAngle: 180 },
  { name: "Figma", icon: <FaFigma />, color: "#00d9f5", orbit: 210, duration: 12, startAngle: 60 },
  { name: "JavaScript", icon: <FaJs />, color: "#f7df1e", orbit: 210, duration: 12, startAngle: 240 },
  { name: "AWS", icon: <FaAws />, color: "#ff9900", orbit: 265, duration: 16, startAngle: 120 },
  { name: "Python", icon: <FaPython />, color: "#7b2fff", orbit: 265, duration: 16, startAngle: 300 },
  { name: "CSS", icon: <FaCss3Alt />, color: "#00d9f5", orbit: 155, duration: 20, startAngle: 90 },
  { name: "Design Thinking", icon: <TbBrain />, color: "#c4a8ff", orbit: 210, duration: 20, startAngle: 270 }
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
