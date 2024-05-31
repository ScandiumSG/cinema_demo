import "./PurchaseModal.css"
import { useContext, useEffect, useState } from "react";
import { ITicketHandler } from "@/interfaces/ITicket";
import { IPurchaseModalContext, IScreening } from "@/interfaces/IScreening";
import { translateDateTimeStringWithoutSeconds } from "@/util/timeUtils";
import { purchaseModalContext } from "@/util/context";
import SeatView from "./SeatView/SeatView";
import TicketView from "./TicketView/TicketView";

interface IPurchaseModalProps {
    screening: IScreening,
}

const defaultTickets: ITicketHandler = {
    totalTickets: 0
}

const PurchaseModal: React.FC<IPurchaseModalProps> = ({screening}) => {
    const [selectTickets, setSelectTickets] = useState<ITicketHandler>(defaultTickets);
    const [showSeatMap, setShowSeatMap] = useState<boolean>(false);
    const { setShowPurchase } = useContext<IPurchaseModalContext>(purchaseModalContext);

    const cancelPurchase = () => {
        setSelectTickets({...defaultTickets})
        setShowPurchase(undefined);
    }

    const addTicket = (ticketType: string) => {
        const numTickets = selectTickets.totalTickets;
        const ticketsOfType = selectTickets[ticketType] || 0;
        setSelectTickets({...selectTickets, totalTickets: numTickets+1, [ticketType]: ticketsOfType+1});
    }

    const removeTicket = (ticketType: string) => {
        const numTickets = selectTickets.totalTickets;
        const ticketsOfType = selectTickets[ticketType];
        if (ticketsOfType > 1) {
            setSelectTickets({...selectTickets, totalTickets: numTickets-1, [ticketType]: selectTickets[ticketType]-1});
        } else {
            const tickets = selectTickets;
            delete tickets[ticketType];
            setSelectTickets({...tickets, totalTickets: numTickets-1});
        }
    }

    console.log(screening);

    useEffect(() => {
        console.log(selectTickets);
    }, [selectTickets])

    return(
        <div className="purchase-modal-container">
            <div className="purchase-modal-screening-info">
                <h3>{screening.movie.title}</h3>
                <p>{translateDateTimeStringWithoutSeconds(screening.startTime)}</p>
                <p>Theater: {screening.theater.name}</p>
            </div>
            <div className="purchase-modal-cancel-purchase-container">
                <button className="purchase-modal-cancel-purchase" onClick={() => cancelPurchase()}>
                    X
                </button>
            </div>
            {showSeatMap ?
                <SeatView selectTickets={selectTickets} screening={screening} /> : 
                <TicketView selectTickets={selectTickets} addTicket={addTicket} removeTicket={removeTicket} setShowSeatMap={setShowSeatMap} />
            }
        </div>
    )
}

export default PurchaseModal;