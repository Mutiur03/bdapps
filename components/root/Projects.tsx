"use client"
import React from 'react'
import { useCommonStore } from '@/store/useCommonStore'
function Projects() {
    const { startups, fetchStartups } = useCommonStore()
    React.useEffect(() => {
        fetchStartups()
    }, [])
    return (
        <div>
        </div>
    )
}

export default Projects
