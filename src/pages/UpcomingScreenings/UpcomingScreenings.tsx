import UpcomingSection from "@/components/UpcomingSection/UpcomingSection";
import "./UpcomingScreenings.css"
import { useEffect, useState } from "react";
import { IScreening } from "@/interfaces/IScreening";
import { getUpcomingScreenings } from "@/util/apiUtils";
import loadingDots from "@/assets/loading_dots.svg";

interface IUpcomingScreening {
    [date: string]: IScreening[];
}

const UpcomingScreenings = () => {
    const [upcomingDates, setUpcomingDates] = useState<IUpcomingScreening>();
    const [numberOfUpcoming, setNumberOfUpcoming] = useState<number>(10);
    const currentDate: Date = new Date();

    const fetchScreenings = async () => {
        const dateString = currentDate.toISOString();
        const upcomingScreenings: IScreening[] = await fetch(getUpcomingScreenings(dateString, numberOfUpcoming))
            .then((res) => res.json())
            .then((res) => res.data)

        const screeningsByDate: IUpcomingScreening = {};
        upcomingScreenings?.forEach(screening => {
            const date = screening.startTime.split("T")[0]
            // Check if the date already exists in the object
            if (!screeningsByDate[date]) {
                // If not, create a new array for that date
                screeningsByDate[date] = [];
            }
            screeningsByDate[date].push(screening);
        })
        setUpcomingDates(screeningsByDate);
    }

    useEffect(() => {
        fetchScreenings();
    }, [])

    if (upcomingDates === undefined) {
        return(
            <div className="upcoming-screenings-parent-container">
                <div className="upcoming-screenings-container">
                    <h3>Loading...</h3>
                    <img src={loadingDots} alt="Loading indicator"/>
                </div>
            </div>
        )
    }

    return(
        <div className="upcoming-screenings-parent-container">
            <div className="upcoming-screenings-container highlight">
                {Object.keys(upcomingDates).map((date: string, index: number) => {
                    return(<UpcomingSection 
                        key={index}
                        sectionDate={date} 
                        entries={upcomingDates[date]} 
                    />)
                })}
            </div>
        </div>
    )
}

export default UpcomingScreenings;