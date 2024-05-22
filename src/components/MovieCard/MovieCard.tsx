import { timeCalculator } from "@/util/timeUtils";
import "./MovieCard.css"
import { IMovie } from "@/interfaces/IMovie";
import { useNavigate } from "react-router-dom";

interface Props {
    movie: IMovie
}

const MovieCard = ({movie}: Props) => {
    const navigate = useNavigate();

    const handleCardInteraction = () => {
        navigate("/movies/"+movie.id)
    }
    
    return(
        <div 
            className="movie-card-container"
            onClick={() => handleCardInteraction()}
        >
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