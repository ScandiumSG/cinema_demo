import { ITicketHandler, ITicketPost } from "@/interfaces/ITicket";
import SeatSelector from "./SeatSelector/SeatSelector";
import "./SeatView.css"
import { IScreening } from "@/interfaces/IScreening";
import { useContext, useState } from "react";
import ISeat from "@/interfaces/ISeat";
import { IUserContext } from "@/interfaces/UserInterfaces";
import { userContext } from "@/util/context";
import { postTicket } from "@/util/apiUtils";

interface ISeatViewProps {
    selectTickets: ITicketHandler,
    screening: IScreening,
}

const SeatView: React.FC<ISeatViewProps> = ({selectTickets, screening}) => {
    const [seatSelection, setSeatSelection] = useState<ISeat[]>();
    const { user } = useContext<IUserContext>(userContext);

    const changeSeatSelection = (seats: ISeat[]) => {
        setSeatSelection([...seats]);
    }

    const purchaseTickets = async () => {
        const postContent: ITicketPost = {
            "screeningId": screening.id,
            "movieId": screening.movie.id,
            "customerId": user!.id,
            "seatId": seatSelection!.map((seat: ISeat) => (seat.id))
        }

        console.log(postContent);

        const options =  {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify(seatSelection)
        }

        await fetch(postTicket(), options)
            .then((res) => {console.log(res); return res; })
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => console.log(res))
    }

    return(
        <>
            <SeatSelector 
                ticketSelection={selectTickets} 
                screening={screening} 
                seatSelection={seatSelection} 
                setSelection={changeSeatSelection}
            />
            <div className="purchase-modal-confirm-container">
                    <button onClick={() => purchaseTickets()}>Confirm seats</button>
            </div>
        </>
    )
}

export default SeatView;