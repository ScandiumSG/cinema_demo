import { ITicketHandler } from "@/interfaces/ITicket";
import SeatSelector from "./SeatSelector/SeatSelector";
import "./SeatView.css"
import { IScreening } from "@/interfaces/IScreening";

interface ISeatViewProps {
    selectTickets: ITicketHandler,
    screening: IScreening,
}

const SeatView: React.FC<ISeatViewProps> = ({selectTickets, screening}) => {
    return(
        <>
            <SeatSelector ticketSelection={selectTickets} screening={screening}/>
            <div className="purchase-modal-confirm-container">
                    <button onClick={() => {}}>Confirm seats</button>
            </div>
        </>
    )
}

export default SeatView;