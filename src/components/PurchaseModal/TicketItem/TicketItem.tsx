import { standardCurrency } from "@/util/localizationUtil";
import "./TicketItem.css"

const TicketItem: React.FC<{itemCategory: string, itemPrice: number, numberOfItems: number}> = ({itemCategory, itemPrice, numberOfItems}) => {
    return(
        <div className="ticket-item-container">
            <h3 className="ticket-item-category-header">
                {itemCategory}
            </h3>
            <p className="ticket-item-price">
                {itemPrice+standardCurrency}
            </p>
            <div className="ticket-item-button-container">
                <button className="ticket-item-add-button">
                    +
                </button>
                {numberOfItems !== 0 && 
                    <>
                        <span>{numberOfItems}</span>
                        <button className="ticket-item-remove-button">
                            -
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default TicketItem;