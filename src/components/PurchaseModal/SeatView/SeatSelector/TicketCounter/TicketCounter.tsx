import "./TicketCounter.css"

import ISeat from "@/interfaces/ISeat";
import TicketCounterItem from "./TicketCounterItem/TicketCounterItem";
import { useEffect, useState } from "react";

const TicketCounter: React.FC<{selection: ISeat[]}> = ({selection}) => {
    const [hideDetails, setHideDetails] = useState<boolean>(true);
    const [isDesktop, setDesktop] = useState<boolean>(window.innerWidth > 750);


    
    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth > 750) {
                setDesktop(true);
            } else {
                setDesktop(false)
            }
        }
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        }

    }, [])

    if (!selection) {
        return(
            <div></div>
        )
    }

    if (hideDetails && !isDesktop) {
        return(
            <div className="ticket-counter-parent-container open">
                <div className="ticket-counter-text">
                    Seats: {selection.filter((s: ISeat) => s.id != -1).length} of {selection.length}
                </div>
                <div
                    className="ticket-counter-mobile-button open clickable"
                    onClick={() => setHideDetails(false)}
                >
                    Show details
                </div>
            </div>
        )
    }

    if (!hideDetails && !isDesktop) {
        return(
            <div className="ticket-counter-parent-container close">
                <div className="ticket-counter-text">
                    <span>
                        Seats: {selection.filter((s: ISeat) => s.id != -1).length} of {selection.length}
                    </span>
                    <div
                    className="ticket-counter-mobile-button close clickable"
                    onClick={() => setHideDetails(true)}
                >
                    Hide details
                </div>
                </div>
                <div className="ticket-counter-item-list scrollable">
                    {selection.map((seat: ISeat, index: number) => (
                        <TicketCounterItem key={index} seat={seat}/>
                        ))}
                </div>
            </div>
        )
    }

    return(
        <div className="ticket-counter-parent-container">
            <p className="ticket-counter-header">Selected seats:</p>
            {selection.map((seat: ISeat, index: number) => (
                <TicketCounterItem key={index} seat={seat}/>
            ))}
        </div>
    )
}

export default TicketCounter;