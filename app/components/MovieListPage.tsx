"use client"
import { MovieCard } from "@/app/components/MovieCard";
import Image from "next/image";
import axios from "axios";
import prisma from "@/app/utils/db";
import { useState , useEffect} from "react";
import { getDatas } from "../actions";
import { Button } from "@/components/ui/button";
import { useInView } from 'react-intersection-observer'


interface Data {
    id: number;
    title: string;
    overview?: string;
    release_date?: Date;
    runtime?: number;
    firstImageUrl: string;
    firstVideoUrl: string;
}

const NUMBER_OF_MOVIES = 12;



export default function MovieListPage({ initialUser }: { initialUser: Data[] }) {
    const [movies, setMovies] = useState(initialUser);
    const [offset, setOffset] = useState(NUMBER_OF_MOVIES);
    const {ref , inView} = useInView();

    const loadMoreMovies = async () => {
        const apiMovies:any = await getDatas(offset, NUMBER_OF_MOVIES);
        setMovies(prevMovies => [...prevMovies, ...apiMovies]);
        setOffset(offset+NUMBER_OF_MOVIES);
    };

    useEffect(() => {
        if (inView) {
          loadMoreMovies()
        }
      }, [inView])
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
                {movies.map((movie) => (
                    <div key={movie.id} className="relative h-60">
                        <Image src={movie.firstImageUrl} alt="movie" width={500} height={400} className="rounded-sm absolute w-full h-full object-cover" />
                        <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                            <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                                <Image src={movie.firstImageUrl} alt="movie" width={800} height={800} className="absolute w-full h-full -z-10 rounded-lg object-cover" />
                                <MovieCard key={movie.id} movieId={movie.id} overview={movie.overview || ''} time={movie.runtime || 0} title={movie.title} year={movie.release_date?.toLocaleDateString() as string} youtubeUrl={movie.firstVideoUrl} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={ref} className="mt-5 flex item-center justify-center">
                Loading....
            </div>
        </div>
        
    );
}
