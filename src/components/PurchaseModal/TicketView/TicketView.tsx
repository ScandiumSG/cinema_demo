import { ticketOptions } from "@/util/ticketUtils";
import "./TicketView.css"
import TicketItem from "./TicketItem/TicketItem";
import { ITicketHandler } from "@/interfaces/ITicket";

interface ITicketViewProps {
    selectTickets: ITicketHandler,
    addTicket: (ticketType: string) => void,
    removeTicket: (ticketType: string) => void,
    setShowSeatMap: (value: boolean) => void,
}

const TicketView: React.FC<ITicketViewProps> = ({selectTickets, addTicket, removeTicket, setShowSeatMap}) => {
    return(
        <>
        <div className="purchase-modal-ticket-options">
                {ticketOptions.map((ticketGroup, index: number) => (
                    <TicketItem 
                    key={index} 
                    itemCategory={ticketGroup.name}
                    itemPrice={ticketGroup.price}
                    tickets={selectTickets}
                    increment={addTicket}
                    decrement={removeTicket}
                    />
                ))}
            </div>
            <div className="purchase-modal-confirm-container">
                <button 
                    className="standard-button"
                    onClick={() => setShowSeatMap(true)}
                >
                        Select seating
                </button>
            </div>
        </>
    )
}

export default TicketView;