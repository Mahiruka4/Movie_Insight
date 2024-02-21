"use client"
import Image from "next/image";
import Link from "next/link";
import Logo from '../../public/MovieInsight_logo.png'
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import UserNav from "./UserNav";

interface linkProps{
    name:string;
    href:string;
}

const links: linkProps[] = [
    {name : 'Home' , href:'/home'},
    {name:'Movies',href:'/home/movies'},
    {name:'Recently Added',href:'/home/recently'},
    {name:"My List",href:"/home/user/list"},
]
export default function Navbar({handlenavigation}:{handlenavigation : any}){
    const pathName = usePathname();
    const handlesearch = ()=>{
        handlenavigation();
    }
    return (
        <div className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
            <div className="flex items-center justify-center">
                <Link href="/home" className="w-40">
                    <Image src={Logo} alt="MovieInsight logo" priority />
                </Link>
                <ul className="lg:flex gap-x-4 ml-14 hidden">
                    {links.map((link,idx)=>(
                        <div key={idx}>
                            {pathName === link.href ? (
                                <li>
                                    <Link href={link.href} className="text-white font-semibold undeline text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ):(
                                <li>
                                    <Link className="text-gray-300 font-normal text-sm" href={link.href}>
                                        {link.name}
                                    </Link>
                                </li>
                            )}
                        </div>
                    ))}
                </ul>

            </div>
            <div className="flex items-center gap-x-8">
                <Link href="/home/search"><Search className="w-5 h-5 text-gray-300 cursor-pointer" /></Link>
                
                <Bell className="h-5 w-5  text-gray-300 cursor-pointer" />
                <UserNav />

            </div>
        </div>
    )
}