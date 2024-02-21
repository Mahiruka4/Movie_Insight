import AllMovies from "../components/AllMovies";
import MovieVideo from "../components/MovieVideo";
import Navbar from "../components/Navbar";
import RecentlyAdded from "../components/RecentlyAdded";

export default function HomePage(){
    return (
        <div className="p-5 lg:p-0">
            <MovieVideo></MovieVideo>
            <h1 className="text-3xl font-bold">Recently Added</h1>
            <RecentlyAdded></RecentlyAdded>
            <h1 className="text-3xl font-bold mt-12">Movies</h1>
            <AllMovies></AllMovies>
        </div>
        
    )
}