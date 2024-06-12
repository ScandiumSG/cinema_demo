import "./TicketItemScreeningField.css"

interface IScreeningFieldProps {
    text: string,
    value: string,
    translate?: (value: string) => string
}

const TicketItemScreeningField: React.FC<IScreeningFieldProps> = ({text, value, translate}) => {
    return (
        <div className="ticket-item-screening-info-item-container">
            <span className="ticket-item-screening-info-item-label">
                {text}:
            </span>
            <span className="ticket-item-screening-info-item-value small-caps">
                {translate ? translate(value) : value}
            </span>
        </div>
    )
}

export default TicketItemScreeningField;