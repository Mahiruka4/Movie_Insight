import { MovieCard } from "@/app/components/MovieCard";
import Image from "next/image";
import axios from "axios";
import prisma from "@/app/utils/db";
import MovieListPage from "@/app/components/MovieListPage";
import { getDatas } from "@/app/actions";
import SearchDebounce from "@/app/components/SearchDebouncing";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

async function getMediaData(movieID: number) {
    // Fetch image URLs from Django backend
    const imgResponse = await axios.get(`http://127.0.0.1:8000/api/v1/img/${movieID}`);
    const imgUrls: string[] = imgResponse.data.image_urls;
    const firstImgUrl: string = imgUrls.length > 0 ? imgUrls[0] : '';

    // Fetch video URLs from Django backend
    const vidResponse = await axios.get(`http://127.0.0.1:8000/api/v1/vid/${movieID}`);
    const vidUrls: string[] = vidResponse.data.video_urls;
    const firstVidUrl: string = vidUrls.length > 0 ? vidUrls[0] : '';

    return { firstImageUrl: firstImgUrl, firstVideoUrl: firstVidUrl };
}

async function getData(category : string,offset:number,limit:number){
    switch(category){
        case 'list':{
            let data = await prisma.movie.findMany({
                select: {
                    id: true,
                    title: true,
                    overview: true,
                    release_date: true,
                    runtime: true,
                },
                take: 1000, 
            });
            data = data.sort(() => Math.random() - 0.5);

            // Select the first four items from the shuffled array
            data = data.slice(0, 12);

        
            const movieData = await Promise.all(data.map(async (movie) => {
                const mediaData = await getMediaData(movie.id);
                return { ...movie, ...mediaData };
            }));
        
            return movieData;
        }
        case 'movies':{
            let data = await prisma.movie.findMany({
                select: {
                    id: true,
                    title: true,
                    overview: true,
                    release_date: true,
                    runtime: true,
                },
                skip:40,
                take: 12,
                orderBy:{
                    id:'asc',
                }
            });
            

        
            const movieData = await Promise.all(data.map(async (movie) => {
                const mediaData = await getMediaData(movie.id);
                return { ...movie, ...mediaData };
            }));
        
            return movieData;
        }
        case 'recently':{
            const data = await getDatas(0,8);
            return data;
        }


        default: {
            throw new Error();
        }
    }
}

const Initial_Limit = 12;
export default async function CategoryPage({params}: {params: {genre: string}}){
    const data = await getData(params.genre,0,Initial_Limit);
    return (
        <>
            <MovieListPage initialUser={data as any}></MovieListPage>
        </>
    )
}