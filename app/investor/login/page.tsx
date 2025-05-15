"use client"
import React, { useEffect, useState } from 'react'
import {  signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation';
import useUserStore from '@/store/useUserStore';
import axios from 'axios';

function Page() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { setUser } = useUserStore();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/'; // fallback if not present
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            callbackUrl,
            email,
            password,
            role: "investor",
        });
        console.log(res);

        if (res?.error) {
            setError(res.error);
        }
        else {
            const user = await axios.get(`/api/getuser`);
            console.log(user);
            setUser(user.data);
            if (user.data.isactivated) {
                window.location.href = callbackUrl;
            } else {
                window.location.href = `/user/account-verify`;
            }

        }



    };
    const errorParam = searchParams.get('error');

    const errorMessageMap: Record<string, string> = {
        CredentialsSignin: 'Invalid email or password',
        AccessDenied: 'Access Denied',
    };

    useEffect(() => {
        if (errorParam && errorMessageMap[errorParam]) {
            setError(errorMessageMap[errorParam]);
        }
    }, [errorParam]);

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className=" p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign in to your account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
                    >
                        Sign in
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Page
