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
import spinner from "@/assets/loading_spin.svg";

interface ISeatViewProps {
    selectTickets: ITicketHandler,
    screening: IScreening | undefined,
    refetchScreening: () => void,
}

const SeatView: React.FC<ISeatViewProps> = ({selectTickets, screening, refetchScreening}) => {
    const [seatSelection, setSeatSelection] = useState<ISeat[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { user } = useContext<IUserContext>(userContext);

    const changeSeatSelection = (seats: ISeat[]) => {
        setSeatSelection([...seats]);
    }

    const purchaseTickets = async () => {
        // TODO: Display this error/wait message
        if (screening === undefined) {
            return;
        }
        setIsLoading(true);
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
            .then((res) => res.json())
            .then((res) => res.data)
            .then(() => refetchScreening())
            .finally(() => setIsLoading(false))
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
            { !isLoading ? 
                <button 
                    className="purchase-modal-confirm-button standard-button"
                    onClick={() => purchaseTickets()}
                >
                    Confirm seats
                </button>
                :
                <button 
                    className="purchase-modal-confirm-button-verify standard-button"
                >
                    <img className="loading-spinner" src={spinner} alt="Verifying..."/>
                    <span>Purchasing...</span>
                </button>
            }
            </div>
        </>
    )
}

export default SeatView;