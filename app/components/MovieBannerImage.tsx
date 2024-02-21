import Image from "next/image";
import prisma from "../utils/db";
import MovieButtons from "./MovieButtons";
import axios from "axios";

async function getData(movieId: number) {
  const data = await prisma.movie.findFirst({
      where: {
          id: movieId,
      },
      select: {
          id: true,
          title: true,
          overview: true,
          release_date: true,
          runtime: true,
      },
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

export default async function MovieBannerImage({ id }: { id: number }) {
  const data = await getData(Number(id));
  const mediaData = await getMediaData(Number(id));
  let added = await getWatchDetails(Number(id));

  if (!data) {

    return <div>Error loading movie data</div>;
  }

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
            <Image
            src={mediaData?.firstImageUrl as string}
            width={1920}
            height={1080}
            alt="movieimg"
            className="w-full h-[75vh] object-cover rounded-lg shadow-lg"
            />
            
            <div className="absolute bottom-3 left-7 p-6 pb-3 text-white w-full">
                  <MovieButtons
                    duration={data?.runtime as number}
                    id={data?.id as number}
                    overview={data?.overview as string}
                    releaseDate={data?.release_date as Date}
                    title={data?.title as string}
                    youtubeUrl={mediaData?.firstVideoUrl as string}
                    key={data?.id}
                    inwatchlist={added}
                  />
            </div>
      </div>
      
    </div>
  );
}
