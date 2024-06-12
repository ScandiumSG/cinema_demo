import { IMovie } from "@/interfaces/IMovie";
import "./TicketItemMovie.css"
import { timeCalculator } from "@/util/timeUtils";

interface ITicketItemMovieProps {
    movie: IMovie
}

const TicketItemMovie: React.FC<ITicketItemMovieProps> = ({movie}) => {
    return(
        <div className="ticket-item-movie-info-container">
            <h3 className="ticket-item-movie-title">
                {movie.title}
            </h3>
            <span className="ticket-item-movie-info">
                {movie.rating} - 2D - {timeCalculator(movie.runtime)}
            </span>
        </div>
    )
}

export default TicketItemMovie;