import { determineDayString, getTimeFromDateTimeString } from "@/util/timeUtils";
import "./PurchaseHeader.css"
import { IScreening } from "@/interfaces/IScreening";

interface IPurchaseHeaderProps {
    screening: IScreening,
    cancelPurchase: () => void,
}

const PurchaseHeader: React.FC<IPurchaseHeaderProps> = ({screening, cancelPurchase}) => {
    return(
        <div className="purchase-modal-header-container">
            <div className="purchase-modal-screening-info">
                <h3>{screening.movie.title}</h3>
                <p>{determineDayString(screening.startTime)} - {getTimeFromDateTimeString(screening.startTime)}</p>
                <p>Theater: {screening.theater.name}</p>
            </div>
            <div className="purchase-modal-cancel-purchase-container">
                <button 
                    className="purchase-modal-cancel-purchase" 
                    onClick={() => cancelPurchase()}
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default PurchaseHeader;