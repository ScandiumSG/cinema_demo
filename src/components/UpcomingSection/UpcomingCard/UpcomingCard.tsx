import { IScreening } from "@/interfaces/IScreening"
import "./UpcomingCard.css"
import MovieCard from "@/components/MovieCard/MovieCard"

interface IUpcomingCard {
    screening: IScreening,
}

const UpcomingCard: React.FC<IUpcomingCard> = ({screening}) => {

    return(
        <div className="upcoming-card-parent-container">
            <MovieCard movie={screening.movie} />
            <span className="upcoming-card-theater-name">
                Theater: {screening.theater.name}
            </span>
        </div>
    )
}

export default UpcomingCard;