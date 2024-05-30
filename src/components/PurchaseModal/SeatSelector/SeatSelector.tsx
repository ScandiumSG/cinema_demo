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

const oneSeatSelectedObject = {
    id: -1,
    row: -1,
    seatNumber: -1,
}

const SeatSelector: React.FC<ISeatSelectorProps> = ({ticketSelection, screening}) => {
    const [seatSelection, setSeatSelection] = useState<ISeat[] | undefined>();
    const [allowSeatSelection, setAllowSeatSelection] = useState<boolean>(true);

    const selectSeat = (seat: ISeat) => {
        const seatIndex = seatSelection?.findIndex((s: ISeat) => s.id === -1);
        if ((seatIndex !== -1 && seatIndex !== undefined) && seatSelection) {
            const modifiedSeatSelection = seatSelection;
            modifiedSeatSelection[seatIndex] = seat;
            sortSeats(modifiedSeatSelection)
            setSeatSelection([...modifiedSeatSelection]);
        }
    }

    const discardSeat = (seat: ISeat) => {
        const seatToRemove = seatSelection?.find((s: ISeat) => s.id === seat.id);
        if (seatToRemove && seatSelection) {
            const modifiedSeatSelection = seatSelection;
            modifiedSeatSelection
                .splice(modifiedSeatSelection.indexOf(seatToRemove), 1)
            modifiedSeatSelection.push(oneSeatSelectedObject);
            sortSeats(modifiedSeatSelection)
            setSeatSelection([...modifiedSeatSelection]);
        }
    }

    const sortSeats = (seats: ISeat[]) => {
        seats.sort((a, b) => {
            if (a.id === -1) return 1;
            if (b.id === -1) return -1;
            return a.id - b.id
        })
    }

    const lockSeatSelection = () => {
        setAllowSeatSelection(!allowSeatSelection);
    }

    useEffect(() =>  {
        const seatArray: ISeat[] | undefined = [];
        for (let i = 0; i < ticketSelection.totalTickets; i++) {
            seatArray.push(oneSeatSelectedObject)
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
                {seatSelection && <TicketCounter selection={seatSelection}/>}
                <TheaterSeatSelector 
                    currentSelected={seatSelection}
                    theaterSeats={screening?.theater?.seats} 
                    />
                <ScaleControl />
            </seatingContext.Provider>
        </div>
    )
}

export default SeatSelector;