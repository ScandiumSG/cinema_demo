import { IMovieDetails } from "@/interfaces/IMovie";
import "./ScreeningMovieDetails.css"
import { timeCalculator } from "@/util/timeUtils";

interface IMovieInput {
    movie: IMovieDetails
}

const ScreeningMovieDetails: React.FC<IMovieInput> = ({movie}) => {
    return(
        <div className="screening-movie-details">
            <div className="screening-movie-information">
                <div className="screening-movie-details-info">
                    <p className="screening-movie-details-description-header">
                        Information about {movie.title}:
                    </p>
                    <p className="screening-movie-details-description">
                        {movie.description}
                    </p>
                    <div className="screening-movie-meta-info">
                        <p>Runtime: {timeCalculator(movie.runtime)}</p>
                        <p>Rating: {movie.rating}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScreeningMovieDetails;