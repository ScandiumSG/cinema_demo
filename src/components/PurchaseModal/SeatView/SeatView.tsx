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
    closeWindow: () => void,
}

const SeatView: React.FC<ISeatViewProps> = ({selectTickets, screening, refetchScreening, closeWindow}) => {
    const [seatSelection, setSeatSelection] = useState<ISeat[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [purchaseComplete, setPurchaseComplete] = useState<boolean>(false);
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
            .then((res) => {
                if (res.status === 204) {
                    return res;
                } else {
                    return res.json()}
                }
            )
            .then((res) => res.data)
            .then(() => refetchScreening())
            .finally(() => {
                setIsLoading(false)
                setPurchaseComplete(true);
            })
    }

    if (screening?.theater.seats == undefined) {
        return(
            <div>
                <img src={loading} />
            </div>
        )
    }

    if (purchaseComplete) {
        return(
            <div className="purchase-modal-purchase-complete-container">
                <h3>Purchase complete</h3>
                <p> Thank you for your purchase of {seatSelection?.length} tickets to {screening.movie.title}.</p>
                <button
                    className="standard-button purchase-modal-return-button"
                    onClick={() => closeWindow()}
                > 
                    Return to screening
                </button>
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