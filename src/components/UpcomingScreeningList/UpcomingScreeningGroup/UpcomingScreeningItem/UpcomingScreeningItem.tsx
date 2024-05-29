import { IScreening } from "@/interfaces/IScreening";
import "./UpcomingScreeningItem.css"
import { getTimeFromDateTimeString } from "@/util/timeUtils";

interface IScreeningItem {
    screening: IScreening,
}

const UpcomingScreeningItem: React.FC<IScreeningItem> = ({screening}) => {
    return(
        <div className="upcoming-screening-item clickable">
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