import { IScreening } from "@/interfaces/IScreening";
import "./SeatSelector.css"
import TheaterSeatSelector from "./TheaterSeatMap/TheaterSeatMap";
import TicketCounter from "./TicketCounter/TicketCounter";
import { ITicketFromScreening, ITicketHandler, ITicketType } from "@/interfaces/ITicket";
import { useEffect, useState } from "react";
import ISeat, { ISeatWithTicket } from "@/interfaces/ISeat";
import { seatingContext } from "@/util/context";

interface ISeatSelectorProps {
    ticketOptions: ITicketType[],
    ticketSelection: ITicketHandler,
    screening: IScreening,
    seatSelection: ISeatWithTicket[] | undefined,
    setSelection: (seats: ISeatWithTicket[]) => void,
}

const oneSeatSelectedObject: ISeat = {
    id: -1,
    row: -1,
    seatNumber: -1,
}

const SeatSelector: React.FC<ISeatSelectorProps> = ({ticketOptions, ticketSelection, screening, seatSelection, setSelection}) => {
    const [allowSeatSelection, setAllowSeatSelection] = useState<boolean>(true);
    const [occupiedSeats, setOccupiedSeats] = useState<ISeat[] | undefined>();
    const [currentScreening, setCurrentScreening] = useState<IScreening>(screening)

    const selectSeat = (seat: ISeat) => {
        //Check if seat already exists in seatSelection
        const previouslySelected = seatSelection
            ?.findIndex((s: ISeatWithTicket) => s.id == seat.id);
        if (previouslySelected !== -1) {
            discardSeat(seat);
            return;
        }

        const seatObject = seatSelection?.find((s: ISeatWithTicket) => s.id === -1);
        if (!seatObject || !seatSelection) {
            return;
        }

        const seatIndex = seatSelection.indexOf(seatObject!);
        if ((seatIndex !== -1 && seatIndex !== undefined) && seatSelection) {
            const modifiedSeatSelection = seatSelection;
            modifiedSeatSelection[seatIndex] = {...seat, ticketType: seatObject.ticketType};
            sortSeats(modifiedSeatSelection)
            setSelection([...modifiedSeatSelection]);
        }
    }

    const discardSeat = (seat: ISeat) => {
        const seatToRemove = seatSelection?.find((s: ISeat) => s.id === seat.id);
        if (seatToRemove && seatSelection) {
            const modifiedSeatSelection = seatSelection;
            modifiedSeatSelection
                .splice(modifiedSeatSelection.indexOf(seatToRemove), 1)
            modifiedSeatSelection.push(
                {...oneSeatSelectedObject, ticketType: seatToRemove.ticketType});
            sortSeats(modifiedSeatSelection)
            setSelection([...modifiedSeatSelection]);
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

    useEffect(() => {
        setCurrentScreening(screening)
    }, [screening])

    useEffect(() => {
        const occupiedSeats = currentScreening.tickets.map((ticket: ITicketFromScreening) => (ticket.seat));
        setOccupiedSeats([...occupiedSeats]);
    }, [currentScreening])

    useEffect(() =>  {
        const seatArray: ISeatWithTicket[] | undefined = [];
        const ticketTypeIds: number[] = []
        Object.entries(ticketSelection).forEach(([entry, value]) => {
            if (entry != "totalTickets") {
                const id = ticketOptions.find((opt) => opt.name == entry)?.id;
                if (id) {
                    for (let i = 0; i < value; i++) {
                        ticketTypeIds.push(id);
                    }
                }
            }
        })
        for (let i = 0; i < ticketSelection.totalTickets; i++) {
            seatArray.push({...oneSeatSelectedObject, ticketType: ticketTypeIds[i]})
        }
        setSelection([...seatArray])
    }, [ticketSelection])

    return(
        <div className="seat-selector-parent-container">
            <seatingContext.Provider 
            value={{
                selectSeat: selectSeat,
                discardSeat: discardSeat,
                allowSeating: allowSeatSelection,
                toggleAllowSeating: lockSeatSelection
            }}>
                <div        
                    className="seat-selector-theater-container"
                >
                    <div className="seat-selector-container">
                        <TheaterSeatSelector 
                            occupiedSeats={occupiedSeats}
                            currentSelected={seatSelection}
                            theaterSeats={currentScreening?.theater?.seats} 
                        />
                    </div>
                    {seatSelection && 
                        <TicketCounter selection={seatSelection}/>
                    }
                </div>
                {/*<ScaleControl />*/}
            </seatingContext.Provider>
        </div>
    )
}

export default SeatSelector;