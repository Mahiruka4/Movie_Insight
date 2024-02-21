import prisma from "../utils/db";
import MovieButtons from "./MovieButtons";
import axios from "axios";

async function getWatchDetails(id: number) {
    try {
        const data = await prisma.watchList.findFirst({
            where: {
                id: id,
            },
        });
        return !!data; 
    } catch (error) {
        console.error("Error fetching watch details:", error);
        return false; 
    }
  }



async function getData() {
    const data = await prisma.movie.findFirst({
        where: {
            id: 559
        },
        select: {
            title: true,
            overview: true,
            release_date: true,
            runtime: true,
            id: true,
        }
    });
    
    return data;
}

async function getMediaData(movieID:number){
    // Fetch image URLs from Django backend
    const imgResponse = await axios.get(`http://127.0.0.1:8000/api/v1/img/${movieID}`);
    const imgUrls: string[] = imgResponse.data.image_urls;
    const firstImgUrl: string = imgUrls[0];

    // Fetch video URLs from Django backend
    const vidResponse = await axios.get(`http://127.0.0.1:8000/api/v1/vid/${movieID}`);
    const vidUrls: string[] = vidResponse.data.video_urls;
    const firstVidUrl: string = vidUrls[0];
    return { firstImageUrl: firstImgUrl, firstVideoUrl: firstVidUrl };

}


export default async function MovieVideo() {
    const data = await getData();
    const mediaData = await getMediaData(559);
    let added = await getWatchDetails(Number(559));
    return (
        <div className="h-[55vh] lg:h-[65vh] w-full flex justify-start items-center">
            <video
            poster = {mediaData?.firstImageUrl}
            autoPlay
            muted
            loop
            src={mediaData?.firstVideoUrl}
            className="w-full absolute top-0 left-0 h-[70vh] object-cover -z-10 brightness-[60%]"
            ></video>
            <div className="absolute w-[90%] lg:w-[40%] mx-auto">
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">{data?.title}</h1>
                <p className="text-white text-lg mt-5 line-clamp-3">{data?.overview}</p>
                <div className="flex gap-x-3 mt-6">
                    <MovieButtons duration={data?.runtime as number} id={data?.id as number} overview={data?.overview as string} releaseDate={data?.release_date as Date} title={data?.title as string} youtubeUrl={mediaData?.firstVideoUrl as string} key={data?.id} inwatchlist={added}></MovieButtons>
                </div>
            </div>
        </div>

    )
}