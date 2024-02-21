"use client"
import { PlayCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface iAppProps {
    title:string;
    overview: string;
    movieId: number;
    youtubeUrl: string;
    year: string;
    time: number;
}


export function MovieCard({movieId,overview,title,youtubeUrl,year,time}: iAppProps) {
    return (
        <>
            <button className="-mt-14">
                <Link href={"/movie/"+movieId}><PlayCircle className="h-20 w-20"/></Link>
                
            </button>

            <div className="p-5 absolute bottom-0 left-0">
                <h1 className="font-bold text-lg line-camp-1">{title}</h1>
                <div className="flex gap-x-2 items-center">
                    <p className="font-normal text-sm border py-0.5 px-1 border-gray-200 rounded">{year}</p>
                    <p className="font-normal text-sm border py-0.5 px-1 border-gray-200 rounded">{time}Min</p>
                </div>
                <p className="line-clamp-1 text-sm text-gray-200 font-light">{overview}</p>
            </div>
            </>
    );
}