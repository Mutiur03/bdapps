'use client'
import React from 'react'
import { useCommonStore } from '@/store/useCommonStore'
const Project = () => {
    const { fetchStartups, setIsLoading, isLoading, startups } = useCommonStore()
    React.useEffect(() => {
        const loadStartups = async () => {
            await fetchStartups()
            setIsLoading(false)
        }
        loadStartups()
    }, [])
    return (
        <div>

        </div>
    )
}

export default Project
