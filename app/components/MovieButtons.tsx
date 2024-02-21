"use client"

import { Button } from "@/components/ui/button"
import { InfoIcon, PlayCircle } from "lucide-react"
import { useState } from "react"
import PlayVideoModal from "./PlayVideoModel";
import { usePathname } from "next/navigation";
import { addTowatchlist , deleteFromWatchlist } from "../actions";
interface iAppProps {
    overview:string;
    youtubeUrl:string;
    id: number;
    title: string;
    releaseDate: Date;
    duration :number;
    inwatchlist:boolean;
}

export default function MovieButtons({duration,id,title,releaseDate,overview,youtubeUrl,inwatchlist}:iAppProps) {
    const pathName = usePathname();
    const [open,setOpen] = useState(false);
    return (
        <>
            <div className="flex">
                <Button onClick={() => setOpen(true)} className="text-lg font-medium mr-5">
                    <PlayCircle className="mr-2 h-6 w-6" /> Play 
                </Button>
                <Button onClick={() => setOpen(true)} className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white mr-5">
                    <InfoIcon className="mr-2 h-6 w-6" />Learn More
                </Button>
                {!inwatchlist ? (
                                <form action={addTowatchlist}>
                                    <input type="hidden" name="movieId" value={Number(id)} />
                                    <input type="hidden" name="pathname" value={pathName}/>
                                    <Button className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white">
                                        <InfoIcon className="mr-2 h-6 w-6" />Add To Watchlist
                                    </Button>
                                </form>
                            ):(
                                <form action={deleteFromWatchlist}>
                                    <input type="hidden" name="movieId" value={Number(id)} />
                                    <input type="hidden" name="pathname" value={pathName}/>
                                    <Button className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white">
                                        <InfoIcon className="mr-2 h-6 w-6" />Remove From Watchlist
                                    </Button>
                                </form>
                            )}
                <PlayVideoModal state={open} changeState={setOpen} duration={duration} key={id} overview={overview} release={releaseDate} title={title} youtubeUrl={youtubeUrl}/>
        
            </div>
             </>
    )
}