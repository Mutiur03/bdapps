'use client';

import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import useUserStore from '@/store/useUserStore';
import LoadingScreen from './LoadingScreen';

export default function LoadUserClient() {
    const { setIsLoading, getUser, isLoading } = useUserStore();

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const session = await getSession();
                if (session) {
                    await getUser(); // Make sure this is awaited
                }
            } catch (err) {
                location.href="/";
                console.error('Failed to load user:', err);
                
            } finally {
                setIsLoading(false); 
            }
        };

        fetchUser();
    }, []);

    if (isLoading) return <LoadingScreen />;

    return null;
}
