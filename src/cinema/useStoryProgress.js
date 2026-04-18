import { useState, useEffect } from 'react'

export default function useStoryProgress() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrolled / (maxScroll || 1))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  
  const smoothStep = (e0, e1, x) => {
    const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)))
    return t * t * (3 - 2 * t)
  }
  
  return {
    progress,
    nashikOpacity: smoothStep(0.38, 0.45, progress) - smoothStep(0.52, 0.58, progress),
    projectsOpacity: smoothStep(0.55, 0.62, progress) - smoothStep(0.76, 0.82, progress),
    ctaOpacity: smoothStep(0.80, 0.88, progress),
  }
}
