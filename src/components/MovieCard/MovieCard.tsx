import { timeCalculator } from "@/util/timeUtils";
import "./MovieCard.css"
import { IMovie } from "@/interfaces/IMovie";

interface Props {
    movie: IMovie
}

const MovieCard = ({movie}: Props) => {
    return(
        <div className="movie-card-container">
            <h3>{movie.title}</h3>
            <img src="https://image.tmdb.org/t/p/original/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg" />
            <div>
                <span>Runtime: {timeCalculator(movie.runtime)}</span>
            </div>
            {movie.year != new Date().getFullYear() ? <span>{movie.year}</span> : <></>}
        </div>
    )
}

export default MovieCard;