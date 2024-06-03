import { IMovieDetails } from "@/interfaces/IMovie";
import "./ScreeningMovieDetails.css"
import { timeCalculator } from "@/util/timeUtils";

interface IMovieInput {
    movie: IMovieDetails
}

const ScreeningMovieDetails: React.FC<IMovieInput> = ({movie}) => {
    return(
        <div className="screening-movie-details">
            <h2 className="screening-movie-details-title">
                {movie.title}
            </h2>
            <div className="screening-movie-information">
                <img
                    className="screening-movie-details-poster"
                    src="https://image.tmdb.org/t/p/original/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg"
                    />
                <div className="screening-movie-details-info">
                    <p className="screening-movie-deatils-description-header">
                        Movie summary:
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