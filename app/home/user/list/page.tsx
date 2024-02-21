import { MovieCard } from "@/app/components/MovieCard";
import Image from "next/image";
import axios from "axios";
import prisma from "@/app/utils/db";

async function getData(movieId: number) {
    try {
        const movieDetails = await prisma.movie.findUnique({
            where: {
                id: movieId
            },
            select: {
                id: true,
                title: true,
                overview: true,
                release_date: true,
                runtime: true
            }
        });

        if (!movieDetails) {
            return null;
        }

        const mediaData = await getMediaData(movieId);
        return { ...movieDetails, ...mediaData };
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
}

async function getMediaData(movieID: number) {
    try {

        const imgResponse = await axios.get(`http://127.0.0.1:8000/api/v1/img/${movieID}`);
        const imgUrls: string[] = imgResponse.data.image_urls;
        const firstImgUrl: string = imgUrls.length > 0 ? imgUrls[0] : '';


        const vidResponse = await axios.get(`http://127.0.0.1:8000/api/v1/vid/${movieID}`);
        const vidUrls: string[] = vidResponse.data.video_urls;
        const firstVidUrl: string = vidUrls.length > 0 ? vidUrls[0] : '';

        return { firstImageUrl: firstImgUrl, firstVideoUrl: firstVidUrl };
    } catch (error) {
        console.error("Error fetching media data:", error);
        throw error;
    }
}

async function getWholeWatchList(){
    const watchids = await getWatchListIds();
    const movieData = [];

    for (const watchListItem of watchids) {
        const movieId = watchListItem.id;
        const movieDetails = await getData(movieId);
        movieData.push(movieDetails);
    }

    return movieData;
}
async function getWatchListIds() {
    let data = await prisma.watchList.findMany({
        select:{
            id:true
        },
    })

    return data;
}

export default async function CategoryPage(){
    const data = await getWholeWatchList();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
            {data?.map((movie)=>(
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
    )
}