"use client"
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { AuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";

export default function HomeLayout({children}:{children: ReactNode}) {
    const router = useRouter();
    const handlenavigation = ()=>{
        router.push('/home/search')
    }
    return(
        

        <>
            <Navbar handlenavigation={handlenavigation}></Navbar>
            <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
                {children}
            </main>
        
        </>
    )
        

}