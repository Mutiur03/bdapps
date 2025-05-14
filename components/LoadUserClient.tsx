'use client';

import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import useUserStore from '@/store/useUserStore';

export default function LoadUserClient() {
    const { setUser, setIsLoading } = useUserStore();

    useEffect(() => {
        const fetchUser = async () => {
            const session = await getSession();
            if (session) {
                setIsLoading(true);
                try {
                    const token = await getSession();
                    console.log(token);
                    if (token) {
                        const user = await axios.get(`/api/user/getuser/${token.user.id}`);
                        console.log(user);
                        setUser(user.data);
                    }
                } catch (err) {
                    console.error('Failed to load user:', err);
                }
            }
            setIsLoading(false);
        };

        fetchUser();
    }, [setUser, setIsLoading]);

    return null; // No UI
}
