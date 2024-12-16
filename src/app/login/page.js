"use client"
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { login } from "../api/login";

const LoginPage = () => {

    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await login(username, password);
        if (response === "SUCCESS") {
            toast.success("Giriş başarılı");
            router.push("/admin");
        }
        else {
            toast.error("Giriş başarısız");
        }
    };

    return (
        <>
            <div className="flex h-screen">
                {/* Sol taraf */}
                <div
                    className="flex-1"
                    style={{
                        backgroundImage: `url('/images/image-1.jpg')`, // Burada `url()` kullanılıyor
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                ></div>


                {/* Sağ taraf */}
                <div className="flex-1 flex items-center justify-center bg-gray-100">
                    <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-700 mb-6">Login</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Login
                            </button>
                            <div className="text-center text-sm">
                                <a href="/signup" className="text-blue-500">Don't you have an account Sign Up</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        </>

    );
};

export default LoginPage;
