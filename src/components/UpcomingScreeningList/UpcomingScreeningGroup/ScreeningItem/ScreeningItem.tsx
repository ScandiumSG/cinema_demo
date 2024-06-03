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
            className="screening-item clickable"
            onClick={() => interactWithScreening()}
        >
            <div className="screening-item-primary">
                <p className="screening-item-theater">
                    {screening.theater.name}
                </p>
                <p className="screening-item-start-time">
                    {getTimeFromDateTimeString(screening.startTime)}
                </p>
            </div>
            <div className="screening-item-secondary">
                {screening.theater.capacity - screening.ticketsSold} / {screening.theater.capacity}
            </div>
        </div>
    )
}

export default ScreeningItem;