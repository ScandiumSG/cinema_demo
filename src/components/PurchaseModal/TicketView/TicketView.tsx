import "./TicketView.css"
import TicketItem from "./TicketItem/TicketItem";
import { ITicketHandler, ITicketType } from "@/interfaces/ITicket";

interface ITicketViewProps {
    ticketOptions: ITicketType[],
    selectTickets: ITicketHandler,
    addTicket: (ticketType: string) => void,
    removeTicket: (ticketType: string) => void,
    setShowSeatMap: (value: boolean) => void,
}

const TicketView: React.FC<ITicketViewProps> = ({ticketOptions, selectTickets, addTicket, removeTicket, setShowSeatMap}) => {
    return(
        <>
        <div className="purchase-modal-ticket-options">
                {ticketOptions.map((ticketType, index: number) => (
                    <TicketItem 
                    key={index} 
                    ticketType={ticketType}
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