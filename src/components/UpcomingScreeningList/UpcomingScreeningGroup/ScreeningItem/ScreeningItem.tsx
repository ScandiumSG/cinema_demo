import { IPurchaseModalContext, IScreening } from "@/interfaces/IScreening";
import "./ScreeningItem.css"
import { getTimeFromDateTimeString } from "@/util/timeUtils";
import { useContext } from "react";
import { purchaseModalContext } from "@/util/context";

interface IScreeningItem {
    screening: IScreening,
}

const ScreeningItem: React.FC<IScreeningItem> = ({screening}) => {
    const { setShowPurchase } = useContext<IPurchaseModalContext>(purchaseModalContext);

    const interactWithScreening = () => {
        setShowPurchase(screening);
    }
    
    return(
        <div 
            className="upcoming-screening-item clickable"
            onClick={() => interactWithScreening()}
        >
            <div>
                <span>{getTimeFromDateTimeString(screening.startTime)} - </span>
                <span>{screening.theater.name}</span>
            </div>
            {/* Tickets left, requires connection of tickets to the screening endpoint in backend.
            <div>
                {screening.theater.capacity - screening.tickets.length} tickets left
            </div>
            */}
        </div>
    )
}

export default ScreeningItem;