import { ITicket } from "@/interfaces/ITicket"
import "./TicketItem.css"

interface ITicketItemProps {
    ticket: ITicket,
}

const TicketItem: React.FC<ITicketItemProps> = ({ticket}) => {
    const curDate = new Date();
    return(
        <div className="ticket-item-parent-container top-rounded-corners highlight">
            <img 
                className="ticket-item-card-image-header"
                src="https://image.tmdb.org/t/p/original/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg" 
            />
            <div className="">
                <span>
                    {ticket.screening.movie.title}
                </span>
                <span>
                    {new Date(ticket.screening.startTime) > curDate ? "true" : "false"}
                </span>
            </div>
        </div>
    )
}

export default TicketItem;