import React from 'react'
import useStoryProgress from './useStoryProgress'

export default function StoryProgress() {
    const { progress } = useStoryProgress()
    return (
        <div style={{ position: 'fixed', right: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 100 }}>
            <span style={{ color: '#00f5a0', fontSize:'0.75rem' }}>{Math.round(progress*100)}%</span>
        </div>
    )
}
