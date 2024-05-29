import { IScreening } from "@/interfaces/IScreening";
import "./UpcomingScreeningItem.css"
import { getTimeFromDateTimeString } from "@/util/timeUtils";
import { useNavigate } from "react-router-dom";

interface IScreeningItem {
    screening: IScreening,
}

const UpcomingScreeningItem: React.FC<IScreeningItem> = ({screening}) => {
    const navigate = useNavigate();
    const navigateToScreening = () => {
        const navString = `/screening/${screening.movie.id}/${screening.id}`
        navigate(navString);
    }

    return(
        <div 
            className="upcoming-screening-item clickable"
            onClick={() => navigateToScreening()}
        >
            <div>
                <span>{getTimeFromDateTimeString(screening.startTime)} - </span>
                <span>{screening.theater.name}</span>
            </div>
            {/* Tickets left, requires connection of tickets to the screening endpoint in backend.
            <div>
                {screening.theater.capacity - screening.tickets.length} tickets left
            </div>
            */}
        </div>
    )
}

export default UpcomingScreeningItem;