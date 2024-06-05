import { standardCurrency } from "@/util/localizationUtil";
import "./TicketItem.css"
import { ITicketHandler } from "@/interfaces/ITicket";

interface ITicketItemProps {
    itemCategory: string, 
    itemPrice: number, 
    tickets: ITicketHandler,
    increment: (ticketType: string) => void,
    decrement: (ticketType: string) => void,
}

const TicketItem: React.FC<ITicketItemProps> = ({itemCategory, itemPrice, tickets, increment, decrement}) => {
    return(
        <div className="ticket-item-container">
            <h3 className="ticket-item-category-header">
                {itemCategory}
            </h3>
            <p className="ticket-item-price">
                {itemPrice+standardCurrency}
            </p>
            <div className="ticket-item-button-container">
                <button className="ticket-item-add-button" onClick={() => increment(itemCategory)}>
                    +
                </button>
                {(tickets[itemCategory] || 0) !== 0 && 
                    <>
                        <span className="ticket-item-itemnumber">{tickets[itemCategory] || 0}</span>
                        <button className="ticket-item-remove-button" onClick={() => decrement(itemCategory)}>
                            -
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default TicketItem;