"use client";
import { StartupProfile } from "@/components/shared/startup-profile";
import { useParams } from "next/navigation";

import React from 'react'

const page = () => {
    const { id } = useParams();
    return (
        <div className="min-h-screen bg-background text-foreground">
            <StartupProfile id={id as string} />
        </div>
    )
}

export default page
