import { IUserData } from "@/interfaces/UserInterfaces";
import "./PurchaseHistory.css"
import { useEffect, useState } from "react";
import { getTicketPurchases } from "@/util/apiUtils";
import { ITicket } from "@/interfaces/ITicket";
import TicketItem from "./TicketItem/TicketItem";

interface IPurchaseHistoryProps {
    user: IUserData
}

const PurchaseHistory: React.FC<IPurchaseHistoryProps> = ({user}) => {
    const [tickets, setTickets] = useState<ITicket[]>([]);
    // @ts-ignore
    const [showPrevious, setShowPrevious] = useState<boolean>(true);

    const sortTickets = (tickets: ITicket[]) => {
        const sortedTickets: ITicket[] = tickets;
        sortedTickets.sort((a,b) => 
            new Date(b.screening.startTime).getTime() - new Date(a.screening.startTime).getTime()
        )

        return [...sortedTickets];
    }

    const fetchPurchased = async () => {
        const options = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "authorization": `Bearer ${user.token}`
            }
        }

        await fetch(getTicketPurchases(showPrevious), options)
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res: ITicket[]) => sortTickets(res))
            .then((res) => setTickets([...res]))
    }

    useEffect(() => {
        fetchPurchased();
    }, [showPrevious])

    return(
        <div className="purchase-history-parent-container scrollable">
            <div className="purchase-history-header-container">
                <h3 className="purchase-history-header">My tickets:</h3>
                <label>
                    <input 
                        type="checkbox" 
                        checked={showPrevious} 
                        onChange={() => setShowPrevious(!showPrevious)}
                        />
                    Show expired
                </label>
            </div>
            <div className="purchase-history-ticket-container">
                {tickets.map((ticket: ITicket, index: number) => (
                    <TicketItem key={index} ticket={ticket}/>
                ))}
            </div>
        </div>
    )
}

export default PurchaseHistory;