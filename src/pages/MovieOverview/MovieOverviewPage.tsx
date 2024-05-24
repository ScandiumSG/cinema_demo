import "./MovieOverviewPage.css"
import MovieCard from "@/components/MovieCard/MovieCard";
import { IMovie } from "@/interfaces/IMovie";
import { getMoviesUnlimited } from "@/util/apiUtils";
import { useEffect, useState } from "react";

const MovieOverviewPage = () => {
    const [movieList, setMovieList] = useState<IMovie[]>()
    const [filteredMoviesList, setFilteredMovieList] = useState<IMovie[]>();

    const retrieveMovies = async () => {
        await fetch(getMoviesUnlimited())
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setMovieList([...res]))
    }

    useEffect(() => {
        retrieveMovies();
    }, [])

    useEffect(() =>  {
        if (movieList) {
            console.log(movieList[1])
            setFilteredMovieList([...movieList]);
        }
    }, [movieList])

    return(
        <div className="movie-card-list-parent-container">
            <div className="movie-card-list-container">
                {filteredMoviesList?.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default MovieOverviewPage;