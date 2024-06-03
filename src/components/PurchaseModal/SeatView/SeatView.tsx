import { ITicketHandler, ITicketPost } from "@/interfaces/ITicket";
import SeatSelector from "./SeatSelector/SeatSelector";
import "./SeatView.css"
import { IScreening } from "@/interfaces/IScreening";
import { useContext, useState } from "react";
import ISeat from "@/interfaces/ISeat";
import { IUserContext } from "@/interfaces/UserInterfaces";
import { userContext } from "@/util/context";
import { postTicket } from "@/util/apiUtils";
import loading from "@/assets/loading_dots.svg"

interface ISeatViewProps {
    selectTickets: ITicketHandler,
    screening: IScreening | undefined,
    refetchScreening: () => void,
}

const SeatView: React.FC<ISeatViewProps> = ({selectTickets, screening, refetchScreening}) => {
    const [seatSelection, setSeatSelection] = useState<ISeat[]>();
    const { user } = useContext<IUserContext>(userContext);

    const changeSeatSelection = (seats: ISeat[]) => {
        setSeatSelection([...seats]);
    }

    const purchaseTickets = async () => {
        // TODO: Display this error/wait message
        if (screening === undefined) {
            return;
        }

        const postContent: ITicketPost = {
            "screeningId": screening.id,
            "movieId": screening.movie.id,
            "customerId": user!.id,
            "seatId": seatSelection!.map((seat: ISeat) => (seat.id))
        }

        const options =  {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify(postContent)
        }

        await fetch(postTicket(), options)
            .then((res) => {console.log(res.status, res.statusText); return res; })
            .then((res) => res.json())
            .then((res) => res.data)
            .then(() => refetchScreening())
    }

    if (screening === undefined) {
        return(
            <div>
                <img src={loading} />
            </div>
        )
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