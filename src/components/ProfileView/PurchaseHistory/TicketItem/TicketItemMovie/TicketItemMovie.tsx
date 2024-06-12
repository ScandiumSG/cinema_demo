import { IMovie } from "@/interfaces/IMovie";
import "./TicketItemMovie.css"
import { timeCalculator } from "@/util/timeUtils";

interface ITicketItemMovieProps {
    movie: IMovie
}

const TicketItemMovie: React.FC<ITicketItemMovieProps> = ({movie}) => {
    return(
        <div className="ticket-item-movie-info">
            <h3>
                {movie.title}
            </h3>
            <span>
                {movie.rating} * 2d * {timeCalculator(movie.runtime)}
            </span>
        </div>
    )
}

export default TicketItemMovie;