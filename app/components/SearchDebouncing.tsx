"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getDataSearch } from "../actions";
import Image from "next/image";
import { MovieCard } from "./MovieCard";

interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: Date;
    runtime: number;
    firstImageUrl: string;
    firstVideoUrl: string;
}

export default function SearchDebounce(){
    const [movies,setMovies] = useState<Movie[]>([]);
    const [search,setSearch] = useState("");

    useEffect(()=>{
        const delaySearch = setTimeout(async ()=>{
            if(search){
                const data = await getDataSearch(search) as any;
                setMovies(data);
            }
            
        },100);

        return () =>{
            clearTimeout(delaySearch);
        }
    },[search]);


    const handleInputChange = (event:any) =>{
        setSearch(event.target.value);
    }
    return (
        <>
            <div className="flex justify-center">
                <Input type="text" className="w-[50%] mr-5" placeholder="Search movies..." value={search} onChange={handleInputChange} ></Input>
                
                <Button><svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="3em">
                <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
                </svg></Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6 h-[70vh]">
            {movies?.map((movie)=>(
                <div key={movie?.id} className="relative h-60">
                    <Image src={movie?.firstImageUrl as string} alt="movie" width={500} height={400} className="rounded-sm absolute w-full h-full object-cover"/>
                    <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                        <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                            <Image src={movie?.firstImageUrl as string} alt="movie" width={800} height={800} className="absolute w-full h-full -z-10 rounded-lg object-cover"/>

                            <MovieCard key={movie?.id} movieId={movie?.id as number} overview={movie?.overview as string} time={movie?.runtime as number} title={movie?.title as string} year={movie?.release_date?.toLocaleDateString() as string} youtubeUrl={movie?.firstVideoUrl as string} />
                        </div>

                    </div>
                </div>
            ))}
        </div>
            
        
        </>
    )
}