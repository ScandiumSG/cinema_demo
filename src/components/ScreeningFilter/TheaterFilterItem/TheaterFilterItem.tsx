import ITheater from "@/interfaces/ITheater";
import "./TheaterFilterItem.css"

interface ITheaterFilterItemProps {
    theater: ITheater, 
    tracker: Record<number, boolean>, 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TheaterFilterItem: React.FC<ITheaterFilterItemProps> = ({theater, tracker, handleChange}) => {
    return(
        <div className="theater-filter-item-parent-container">
            <label>
                <input 
                    type="checkbox" 
                    value={theater.id} 
                    checked={tracker[theater.id]}
                    onChange={(e) => handleChange(e)}
                />
                {theater.name}
            </label>
        </div>
    )
}

export default TheaterFilterItem;