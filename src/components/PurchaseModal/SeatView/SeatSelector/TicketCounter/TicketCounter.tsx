import "./TicketCounter.css"

import ISeat from "@/interfaces/ISeat";
import TicketCounterItem from "./TicketCounterItem/TicketCounterItem";

const TicketCounter: React.FC<{selection: ISeat[]}> = ({selection}) => {


    if (!selection) {
        return(
            <div></div>
        )
    }
    
    return(
        <div className="ticket-counter-parent-container">
            <p className="ticket-counter-header">Selected seats:</p>
            {selection.map((seat: ISeat, index: number) => (
                <TicketCounterItem key={index} seat={seat}/>
            ))}
        </div>
    )
}

export default TicketCounter;