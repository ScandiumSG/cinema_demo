import "./PurchaseModal.css"
import { useEffect, useState } from "react";
import { ITicketHandler } from "@/interfaces/ITicket";
import { IScreening } from "@/interfaces/IScreening";
import { translateDateTimeStringWithoutSeconds } from "@/util/timeUtils";
import SeatView from "./SeatView/SeatView";
import TicketView from "./TicketView/TicketView";
import { getSeatsForTheater, getTicketsForScreening } from "@/util/apiUtils";

interface IPurchaseModalProps {
    screening: IScreening,
    showSeatMap: boolean,
    setShowSeatMap: (value: boolean) => void,
    removeDisplay: () => void,
}

const defaultTickets: ITicketHandler = {
    totalTickets: 0
}

const PurchaseModal: React.FC<IPurchaseModalProps> = ({screening, showSeatMap, setShowSeatMap, removeDisplay}) => {
    const [currentScreening, setCurrentScreening] = useState<IScreening | undefined>()
    const [selectTickets, setSelectTickets] = useState<ITicketHandler>(defaultTickets);


    const cancelPurchase = () => {
        console.log("purchaseModal")
        setSelectTickets({...defaultTickets})

        removeDisplay();
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

    const refetchScreening = async () => {
        const seats = await fetch(getSeatsForTheater(screening.theater.id))
            .then((res) => res.json())
            .then((res) => res.data)

        await fetch(getTicketsForScreening(screening.id, screening.movie.id))
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => {
                const tempScreening = screening;
                tempScreening.tickets = res;
                tempScreening.theater.seats = seats;
                return tempScreening;
            })
            .then((tempScreening) => setCurrentScreening({...tempScreening}))
            .then(() => console.log("Fetched screening data"))
    }

    useEffect(() => {
        const interval = setInterval(() => refetchScreening(), 10000)
        return () => {
            clearInterval(interval);
        }
    }, [])

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
                <SeatView 
                    selectTickets={selectTickets} 
                    screening={currentScreening} 
                    refetchScreening={refetchScreening}
                /> : 
                <TicketView 
                    selectTickets={selectTickets} 
                    addTicket={addTicket} 
                    removeTicket={removeTicket} 
                    setShowSeatMap={setShowSeatMap} 
                />
            }
        </div>
    )
}

export default PurchaseModal;