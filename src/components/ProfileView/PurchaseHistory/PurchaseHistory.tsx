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
    const [showPrevious, setShowPrevious] = useState<boolean>(true);

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
            .then((res) => setTickets([...res]))
    }

    useEffect(() => {
        fetchPurchased();
    }, [showPrevious])

    return(
        <div>
            <h3>Tickets:</h3>
            <div>
                {tickets.map((ticket: ITicket, index: number) => (
                    <TicketItem key={index} ticket={ticket}/>
                ))}
            </div>
        </div>
    )
}

export default PurchaseHistory;