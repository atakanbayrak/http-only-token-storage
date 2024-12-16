"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage({ initialToken }) {
    const router = useRouter();

    useEffect(() => {
        // Sayfa yüklendiğinde yapılacak
        console.log("Page loaded");
        console.log("Initial token", initialToken);
        if (initialToken === undefined) {
            router.push("/login");
        }

    }, []);

    return (
        <>
            {initialToken ? <div className="flex h-screen">
                {/* Sol Panel */}

                <p>Merhaba admin</p>
            </div > : <div> Loading... </div>
            }

        </>

    );
}
