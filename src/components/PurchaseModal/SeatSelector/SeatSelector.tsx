import { IScreening } from "@/interfaces/IScreening";
import "./SeatSelector.css"
import TheaterSeatSelector from "./TheaterSeatMap/TheaterSeatMap";
import TicketCounter from "./TicketCounter/TicketCounter";
import ScaleControl from "./ScaleControl/ScaleControl";
import { ITicketHandler } from "@/interfaces/ITicket";
import { useEffect, useState } from "react";
import ISeat from "@/interfaces/ISeat";
import { seatingContext } from "@/util/context";

interface ISeatSelectorProps {
    ticketSelection: ITicketHandler,
    screening: IScreening,
}

const SeatSelector: React.FC<ISeatSelectorProps> = ({ticketSelection, screening}) => {
    const [seatSelection, setSeatSelection] = useState<ISeat[] | undefined>();
    const [allowSeatSelection, setAllowSeatSelection] = useState<boolean>(true);


    const selectSeat = (seat: ISeat) => {
        seatSelection?.find((s: ISeat) => s.id == s.id)
    }

    const discardSeat = (seat: ISeat) => {
        const seatToRemove = seatSelection?.find((s: ISeat) => s.id === seat.id);
    }

    const lockSeatSelection = () => {
        setAllowSeatSelection(!allowSeatSelection);
    }

    useEffect(() =>  {
        const seatArray: ISeat[] | undefined = [];
        for (let i = 0; i < ticketSelection.totalTickets; i++) {
            seatArray.push({
                id: -1,
                row: -1,
                seatNumber: -1,
            })
        }
        setSeatSelection([...seatArray])
    }, [ticketSelection])

    return(
        <div>
            <seatingContext.Provider 
            value={{
                selectSeat: selectSeat,
                discardSeat: discardSeat,
                allowSeating: allowSeatSelection,
                toggleAllowSeating: lockSeatSelection
            }}>
                {seatSelection && <TicketCounter selection={seatSelection} remove={discardSeat}/>}
                <TheaterSeatSelector 
                    theaterSeats={screening?.theater?.seats} 
                    theaterId={screening.theater.id}
                    />
                <ScaleControl />
            </seatingContext.Provider>
        </div>
    )
}

export default SeatSelector;