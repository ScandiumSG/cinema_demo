import { ITicketScreening } from "@/interfaces/IScreening"
import "./TicketItemScreening.css"
import ISeat from "@/interfaces/ISeat"
import { getDateFromDateTimeString, getTimeFromDateTimeString } from "@/util/timeUtils"
import TicketItemScreeningField from "./TicketItemScreeningField/TicketItemScreeningField"

interface ITicketItemScreeningProps {
    screening: ITicketScreening,
    seat: ISeat,
}

const TicketItemScreening: React.FC<ITicketItemScreeningProps> = ({screening, seat}) => {
    return (
        <div className="ticket-item-screening-info highlight">
            <TicketItemScreeningField 
                text="Theater" 
                value={screening.theater.name}
            />
            <div></div>
            <TicketItemScreeningField 
                text="Date" 
                value={screening.startTime} 
                translate={getDateFromDateTimeString}
            />
            <TicketItemScreeningField 
                text="Time" 
                value={screening.startTime}
                translate={getTimeFromDateTimeString}
            />

            <TicketItemScreeningField 
                text="Seat" 
                value={seat.seatNumber.toString()}
            />
            <TicketItemScreeningField 
                text="Row" 
                value={seat.row.toString()}
            />
        </div>
    )
}

export default TicketItemScreening;