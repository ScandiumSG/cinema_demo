import { standardCurrency } from "@/util/localizationUtil";
import "./TicketItem.css"
import { ITicketHandler, ITicketType } from "@/interfaces/ITicket";

interface ITicketItemProps {
    ticketType: ITicketType,
    tickets: ITicketHandler,
    increment: (ticketType: string) => void,
    decrement: (ticketType: string) => void,
}

const TicketItem: React.FC<ITicketItemProps> = ({ticketType, tickets, increment, decrement}) => {
    return(
        <div className="ticket-item-container">
            <h3 className="ticket-item-category-header">
                {ticketType.name}
            </h3>
            <p className="ticket-item-description">
                {ticketType.description}
            </p>
            <p className="ticket-item-price">
                {ticketType.price+standardCurrency}
            </p>
            <div className="ticket-item-button-container">
                <button className="ticket-item-add-button" onClick={() => increment(ticketType.name)}>
                    +
                </button>
                {(tickets[ticketType.name] || 0) !== 0 && 
                    <>
                        <span className="ticket-item-itemnumber">{tickets[ticketType.name] || 0}</span>
                        <button className="ticket-item-remove-button" onClick={() => decrement(ticketType.name)}>
                            -
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default TicketItem;