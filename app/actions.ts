"use server"

import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import axios from "axios";
export async function addTowatchlist(formData: FormData){
    "use server"

    const movieId = formData.get("movieId");
    const pathname = formData.get("pathname") as string;
    
    const data = await prisma.watchList.create({
        data:{
            id: Number(movieId)
        },
    });

    revalidatePath(pathname);
}

export async function deleteFromWatchlist(formData: FormData){
    "use server";
    const movieId = formData.get("movieId");
    const pathname = formData.get("pathname") as string;

    const data = await prisma.watchList.delete({
        where:{
            id:Number(movieId),
        }
    });

    revalidatePath(pathname);
}

export async function getDatas(offset:number,limit:number){
    const data = await prisma.movie.findMany({
        select: {
            id: true,
            title: true,
            overview: true,
            release_date: true, // Assuming 'release_date' corresponds to 'release' in your new schema
            runtime: true, // Assuming 'runtime' corresponds to 'duration' in your new schema
            // Add more fields as needed based on your new schema
        },
        where: {
            release_date: {
                not: null
            }
        },
        skip:offset,
        take: limit,
        orderBy:{
            release_date:'desc',
        }
    });

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

export async function getDataSearch(title:string){
    const data = await prisma.movie.findMany({
        select: {
            id: true,
            title: true,
            overview: true,
            release_date: true,
            runtime: true,
        },
        where: {// Filter by release_date not null
            title: { 
                contains: title,
                mode: 'insensitive',
             }
        },
        take: 6,
        orderBy: {
            release_date: 'desc',
        }
    });

    const movieData = await Promise.all(data.map(async (movie) => {
        const mediaData = await getMediaData(movie.id);
        return { ...movie, ...mediaData };
    }));

    return movieData;
}