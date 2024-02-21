
import Image from "next/image";
import prisma from "../utils/db";
import { MovieCard } from "./MovieCard";
import axios from "axios";

async function getData() {
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
    data = data.slice(0, 4);


    const movieData = await Promise.all(data.map(async (movie) => {
        const mediaData = await getMediaData(movie.id);
        return { ...movie, ...mediaData };
    }));

    return movieData;
}

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


export default async function AllMovies (){
    const data = await getData()
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
            {
                data.map((movie) => (
                    <div key={movie.id} className="relative h-48">

                        <Image src={movie.firstImageUrl} alt="Movie " width={500} height={400} className="rounded-sm absolute w-full h-full object-cover" />
                        <div className="h-60 relative z-10 w-full tranform duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                            <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
                                <Image src={movie.firstImageUrl} alt="Movie" width={800} height={800} className="absolute w-full h-full -z-10 rounded-lg object-cover"></Image>
                                <MovieCard movieId={movie.id} overview={movie.overview as string} title={movie.title} youtubeUrl={movie.firstVideoUrl} key={movie.id} time={movie.runtime as number} year={movie.release_date?.toLocaleDateString() as string}/>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}