
"use client"
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import Router, { useRouter } from "next/navigation";
import Footer from "../components/Footer";


export default function HomeLayout({children}:{children: ReactNode}) {
    const router = useRouter();
    const handlenavigation = ()=>{
        router.push('/home/search')
    }
    return(
        

        <>
            <div className="">
            <Navbar handlenavigation={handlenavigation}></Navbar>
            <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8 mb-12">
                {children}
            </main>
            
            
            <footer>
                <Footer></Footer>
            </footer>
            </div>
            
        
        </>
    )
        

}