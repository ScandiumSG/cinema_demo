import { ticketOptions } from "@/util/ticketUtils";
import "./PurchaseModal.css"
import TicketItem from "./TicketItem/TicketItem";

const PurchaseModal = () => {
    return(
        <div className="purchase-modal-container">
            Hello
            <div className="purchase-modal-ticket-options">
                {ticketOptions.map((ticketGroup, index: number) => (
                    <TicketItem 
                        key={index} 
                        itemCategory={ticketGroup.name}
                        itemPrice={ticketGroup.price}
                        numberOfItems={1}
                    />
                ))}
            </div>
        </div>
    )
}

export default PurchaseModal;