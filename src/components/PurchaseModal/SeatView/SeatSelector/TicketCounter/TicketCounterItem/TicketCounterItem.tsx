import ISeat, { ISeatingContext } from "@/interfaces/ISeat";
import "./TicketCounterItem.css"
import { useContext } from "react";
import { seatingContext } from "@/util/context";

interface ITicketCounterItemProps {
    seat: ISeat,
}

const TicketCounterItem: React.FC<ITicketCounterItemProps> = ({seat}) => {
    const { discardSeat } = useContext<ISeatingContext>(seatingContext)

    const generateString = (seat: ISeat) => {
        if (seat.id === -1) {
            return "Select a seat"
        } else {
            return `Row: ${seat.row} Seat: ${seat.seatNumber}`;
        }
    }

    return(
        <div className="ticket-counter-item-container">
            <span>{generateString(seat)}</span>
            <button className="ticket-counter-item-button" onClick={() => discardSeat(seat)}>X</button>
        </div>
    )
}

export default TicketCounterItem;