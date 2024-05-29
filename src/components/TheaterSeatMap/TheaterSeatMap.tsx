import { useEffect, useState } from "react";
import TheaterOne from "./SeatMaps/TheaterOne";
import "./TheaterSeatMap.css"

interface ITheaterSeatMap {
    theaterId: number,
}

const TheaterSeatSelector: React.FC<ITheaterSeatMap> = ({theaterId}) => {
    const [seatId, setSeatId] = useState<number>();
    const [seatRow, setSeatRow] = useState<number>();
    const [seatNumber, setSeatNumber] = useState<number>();
    
    const selectSeat = (e: any) => {
        setSeatId(e.target.getAttribute("seat-id"));
        setSeatRow(e.target.getAttribute("seat-row"));
        setSeatNumber(e.target.getAttribute("seat-number"));
    }

    useEffect(() => {
        console.log("Id: ", seatId, " - Row: ", seatRow," - Column: ", seatNumber);
    }, [seatId, seatRow, seatNumber])

    switch (theaterId) {
        case 1: {
            return(<TheaterOne onSeatClick={selectSeat}/>)
        }
        default: {
            return(<div>No theater found</div>)
        }
    }

}

export default TheaterSeatSelector;