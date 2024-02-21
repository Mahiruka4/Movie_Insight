"use server"
import MovieBannerImage from "@/app/components/MovieBannerImage";
import MovieRecommender from "@/app/components/MovieRecommender";
import prisma from "@/app/utils/db";
import MovieOverview from "@/app/components/MovieOverview";
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

// MoviePage component
export default async function MoviePage({ params }: { params: { id: number } }) {
  const { id } = params;
  const data = await getData(Number(id));

  return (
    <div className="bg-gray-900 text-white h-[100%]">
      {/* Movie Banner */}
      <MovieBannerImage id={Number(id)} />

      {/* Movie Details */}
      <div className="container mx-auto mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">{data?.title}</h1>
          <div className="text-xl">
            Duration: {data?.runtime} min | Release: {data?.release_date?.toLocaleDateString()}
          </div>
        </div>

        
        <MovieOverview overview={data?.overview as string}/>
        <MovieRecommender movieId={data?.id as any}></MovieRecommender>
      </div>
    </div>
  );
}
