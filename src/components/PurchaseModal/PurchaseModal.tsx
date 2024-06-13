import "./PurchaseModal.css"
import { useContext, useEffect, useState } from "react";
import { ITicketHandler, ITicketType } from "@/interfaces/ITicket";
import { IScreening } from "@/interfaces/IScreening";
import SeatView from "./SeatView/SeatView";
import TicketView from "./TicketView/TicketView";
import { getSeatsForTheater, getTicketTypes, getTicketsForScreening } from "@/util/apiUtils";
import PurchaseHeader from "./PurchaseHeader/PurchaseHeader";
import { IUserContext } from "@/interfaces/UserInterfaces";
import { userContext } from "@/util/context";
import ISeat from "@/interfaces/ISeat";

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
    const [theaterSeatArrangement, setTheaterSeatArrangement] = useState<ISeat[]>()
    const [selectTickets, setSelectTickets] = useState<ITicketHandler>(defaultTickets);
    const { user, showLoginModal } = useContext<IUserContext>(userContext);
    const [ticketOptions, setTicketOptions] = useState<ITicketType[]>([]);

    const fetchTicketOptions = async () => {
        await fetch(getTicketTypes())
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res: ITicketType[]) => res.map((ticket) => (
                {...ticket, price: (ticket.price / 100)}
            )))
            .then((res) => setTicketOptions([...res]))
    }


    const cancelPurchase = () => {
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

    const fetchSeatsForTheater = async () => {
        const seats = await fetch(getSeatsForTheater(screening.theater.id))
            .then((res) => res.json())
            .then((res) => res.data)
        setTheaterSeatArrangement(seats);    
        return seats;
    }

    const refetchScreening = async () => {
        await fetch(getTicketsForScreening(screening.id, screening.movie.id))
            .then((res) => { 
                if (res.status == 204) {
                    return res;
                } else {
                    return res.json();
                }
            })
            .then((res) => res?.data)
            .then((res) => {
                const tempScreening = screening;
                tempScreening.tickets = !res ? [] : res;
                tempScreening.theater.seats = theaterSeatArrangement!;
                return tempScreening;
            })
            .then((tempScreening) => setCurrentScreening({...tempScreening}))
    }

    useEffect(() => {
        fetchTicketOptions();
    }, [])

    useEffect(() => {
        fetchSeatsForTheater()
    }, [screening])

    useEffect(() => {
        if (theaterSeatArrangement) {
            const interval = setInterval(() => refetchScreening(), 10000)
            return () => {
                clearInterval(interval);
            }
        }
    }, [theaterSeatArrangement])

    if (!user) {
        return(
            <div className="purchase-modal-no-user-container">
                <span>
                    You must to be logged in to purchase tickets.
                </span>
                <div className="purchase-modal-no-user-button-container">
                    <button
                        className="purchase-modal-login-button standard-button"
                        onClick={() => cancelPurchase()}
                    >
                        Cancel
                    </button>
                    <button
                        className="purchase-modal-login-button standard-button"
                        onClick={() => showLoginModal()}
                        >
                        Login
                    </button>
                </div>
            </div>
        )
    }


    return(
        <div className="purchase-modal-container">
            <PurchaseHeader cancelPurchase={cancelPurchase} screening={screening}/>
            {showSeatMap ?
                <SeatView 
                    ticketOptions={ticketOptions}
                    selectTickets={selectTickets} 
                    screening={currentScreening} 
                    refetchScreening={refetchScreening}
                    closeWindow={cancelPurchase}
                /> : 
                <TicketView 
                    ticketOptions={ticketOptions}
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