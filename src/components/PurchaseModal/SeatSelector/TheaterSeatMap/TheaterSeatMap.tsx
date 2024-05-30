import { useContext, useEffect, useState } from "react";
import "./TheaterSeatMap.css"
import ISeat, { ISeatData, ISeatingContext } from "@/interfaces/ISeat";
import { seatingContext } from "@/util/context";

interface ITheaterSeatMap {
    currentSelected: ISeat[] | undefined,
    theaterSeats: ISeat[],
}


const TheaterSeatSelector: React.FC<ITheaterSeatMap> = ({currentSelected, theaterSeats}) => {
    const [seatData, setSeatData] = useState<ISeatData[]>();
    const [maxX, setMaxX] = useState<number>(400);
    const [maxY, setMaxY] = useState<number>(400);
    
    const { selectSeat } = useContext<ISeatingContext>(seatingContext);

    const emitSeat = (e: any) => {
        const seatId = e.target.getAttribute("seat-id");
        const seatRow = e.target.getAttribute("seat-row");
        const seatNumber = e.target.getAttribute("seat-number");
        selectSeat({...{
            id: seatId,
            row: seatRow,
            seatNumber: seatNumber,
        }});
    }

    const translateSeatData = (seatingData: ISeat[]) => {
        const data: ISeatData[] = seatingData.map((seat: ISeat) => {
            return({
                seatId: seat.id,
                seatRow: seat.row,
                seatNumber: seat.seatNumber,
                available: true,
            })
        })
        setSeatData([...data])
        const maxRow = data.reduce((maxRow, seat) => {
            return seat.seatRow > maxRow ? seat.seatRow : maxRow;
        }, 0)
        const maxColumn = data.reduce((maxRow, seat) => {
            return seat.seatNumber > maxRow ? seat.seatNumber : maxRow;
        }, 0)
        setMaxX(Math.min(maxColumn * 40, 800));
        setMaxY(Math.min(maxRow * 50, 660));
    }

    const determineSeatOccupancy = (id: number, available: boolean) => {
        if (currentSelected?.find((s) => s.id == id)) {
            return "selected"
        } else {
            if (available) {
                return "available";
            } else {
                return "occupied";
            }
        }
    }

    useEffect(() => {
        if (theaterSeats) {
            translateSeatData(theaterSeats)
        }
    }, [theaterSeats])

    if (seatData === undefined) {
        return(<div>Could not find any seats associated with the theater.</div>)
    } 

    return(
        <svg width={maxX} height={maxY} viewBox={`0 0 ${maxX} ${maxY}`} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            {/* Define the movie seat symbol */}
            <symbol id="movie-seat" viewBox={`0 0 ${maxX-10} ${maxY-10}`} >
                {/* Left arm */}
                <rect x="1" y="1" width="6" height="20" fill="inherit" stroke="black" rx="2"/>
                {/* Right arm */}
                <rect x="25" y="1" width="6" height="20" fill="inherit" stroke="black" rx="2"/>
                {/* Seat cushion */}
                <rect x="8" y="1" width="16" height="14" fill="inherit" stroke="black"
                rx="4"/>
                {/* Seat back */}
                <rect x="7" y="16" width="19" height="4" fill="inherit" stroke="black"
                rx="4"/>
            </symbol>

            {seatData.map((seat: ISeatData, index: number) => (
                <use 
                    key={index}
                    className={`theater-seat-map-seat-symbol ${determineSeatOccupancy(seat.seatId, seat.available)}`}
                    xlinkHref="#movie-seat"
                    x={seat.seatNumber * 35 + (seat.seatRow % 2 * 12)}
                    y={seat.seatRow * 40}
                    seat-id={seat.seatId}
                    seat-row={seat.seatRow}
                    seat-number={seat.seatNumber}
                    onClick={(e) => emitSeat(e)}
                />
            ))}
        </svg>
    )
}

export default TheaterSeatSelector;