import { ITicket } from "@/interfaces/ITicket"
import "./TicketItem.css"
import { useEffect, useState } from "react";
import TicketItemMovie from "./TicketItemMovie/TicketItemMovie";
import TicketItemScreening from "./TicketItemScreening/TicketItemScreening";

interface ITicketItemProps {
    ticket: ITicket,
}

const TicketItem: React.FC<ITicketItemProps> = ({ticket}) => {
    const curDate = new Date();
    const ticketStartTime = new Date(ticket.screening.startTime);
    const [expired, setExpired] = useState<boolean>(false);

    useEffect(() => {
        setExpired(ticketStartTime > curDate);
    }, [ticket])

    return(
        <div 
            className={"ticket-item-parent-container top-rounded-corners clickable " + 
                (expired ? "" : "expired")}
        >
            <img 
                className="ticket-item-card-image-header"
                src="https://preview.redd.it/l2zxnp3s6fec1.jpeg?auto=webp&s=62e4f74556328a9548cdaa21755fe571a8329c33" 
            />
            <div className="ticket-item-information-container">
                <TicketItemMovie movie={ticket.screening.movie} />
                <TicketItemScreening screening={ticket.screening} seat={ticket.seat} />
            </div>
        </div>
    )
}

export default TicketItem;