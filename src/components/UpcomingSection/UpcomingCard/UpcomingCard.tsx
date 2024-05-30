import { IScreening } from "@/interfaces/IScreening"
import "./UpcomingCard.css"
import { getTimeFromDateTimeString } from "@/util/timeUtils"
import ScreeningMovieCard from "@/components/ScreeningMovieCard/ScreeningMovieCard"

interface IUpcomingCard {
    screening: IScreening,
}

const UpcomingCard: React.FC<IUpcomingCard> = ({screening}) => {

    return(
        <div className="upcoming-card-parent-container">
            <ScreeningMovieCard movie={screening.movie} />
            <div className="upcoming-card-locale-details">
                <p className="upcoming-card-start-time">
                    {getTimeFromDateTimeString(screening.startTime)}
                </p>
                <span className="upcoming-card-theater-name">
                    {screening.theater.name}
                </span>
            </div>
        </div>
    )
}

export default UpcomingCard;