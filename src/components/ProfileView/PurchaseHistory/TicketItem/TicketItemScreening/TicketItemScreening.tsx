import { ITicketScreening } from "@/interfaces/IScreening"
import "./TicketItemScreening.css"
import ISeat from "@/interfaces/ISeat"
import { getDateFromDateTimeString, getTimeFromDateTimeString } from "@/util/timeUtils"
import TicketItemScreeningField from "./TicketItemScreeningField/TicketItemScreeningField"
import { ITicketType } from "@/interfaces/ITicket"
import { standardCurrency } from "@/util/localizationUtil"

interface ITicketItemScreeningProps {
    ticketType: ITicketType,
    screening: ITicketScreening,
    seat: ISeat,
}

const TicketItemScreening: React.FC<ITicketItemScreeningProps> = ({ticketType, screening, seat}) => {
    return (
        <div className="ticket-item-screening-info">
            <TicketItemScreeningField 
                text="Theater" 
                value={screening.theater.name}
            />
            <div className="ticket-item-screening-info-split">
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
            <TicketItemScreeningField
                text="Ticket"
                value={`${ticketType.name} ${ticketType.price / 100}${standardCurrency}`}
                />
        </div>
    )
}

export default TicketItemScreening;