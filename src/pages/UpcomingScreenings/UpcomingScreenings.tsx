import UpcomingSection from "@/components/UpcomingSection/UpcomingSection";
import "./UpcomingScreenings.css"
import { useEffect, useState } from "react";
import { IScreening, IUpcomingScreening } from "@/interfaces/IScreening";
import { getUpcomingScreenings } from "@/util/apiUtils";
import loadingDots from "@/assets/loading_dots.svg";
import { sortScreeningsByDate } from "@/util/sortingUtils";
import { getRoundedCurrentTimeIsoString } from "@/util/timeUtils";



const UpcomingScreenings = () => {
    const [upcomingDates, setUpcomingDates] = useState<IUpcomingScreening>();
    const [numberOfUpcoming, setNumberOfUpcoming] = useState<number>(10);

    const fetchScreenings = async () => {
        const dateString = getRoundedCurrentTimeIsoString();
        const upcomingScreenings: IScreening[] = await fetch(getUpcomingScreenings(dateString, numberOfUpcoming))
            .then((res) => res.json())
            .then((res) => res.data)

        const sortedScreening = sortScreeningsByDate(upcomingScreenings)
        setUpcomingDates(sortedScreening);
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
            <div className="upcoming-screenings-container">
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