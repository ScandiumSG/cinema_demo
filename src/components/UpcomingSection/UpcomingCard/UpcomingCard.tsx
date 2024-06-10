import { IScreening } from "@/interfaces/IScreening"
import "./UpcomingCard.css"
import { getTimeFromDateTimeString } from "@/util/timeUtils"
import MovieCard from "@/components/common/MovieCard/MovieCard"
import { useNavigate } from "react-router-dom"

interface IUpcomingCard {
    screening: IScreening,
}

const UpcomingCard: React.FC<IUpcomingCard> = ({screening}) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(`/screening/${screening.movie.id}`)
    }

    return(
        <div className="upcoming-card-parent-container clickable" onClick={() => handleNavigation()}>
            <MovieCard movie={screening.movie} navigation={undefined}/>
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