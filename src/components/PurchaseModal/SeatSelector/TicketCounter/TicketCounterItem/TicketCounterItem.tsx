import ISeat from "@/interfaces/ISeat";
import "./TicketCounterItem.css"

interface ITicketCounterItemProps {
    seat: ISeat,
}

const TicketCounterItem: React.FC<ITicketCounterItemProps> = ({seat}) => {

    const generateString = (seat: ISeat) => {
        if (seat.id === -1) {
            return "Select a seat"
        } else {
            return `Row ${seat.row} Seat: ${seat.seatNumber}`;
        }
    }

    return(
        <div className="ticket-counter-item-container">
            <span>{generateString(seat)}</span>
        </div>
    )
}

export default TicketCounterItem;