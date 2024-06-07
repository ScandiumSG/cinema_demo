import UpcomingSection from "@/components/UpcomingSection/UpcomingSection";
import "./UpcomingScreenings.css"
import { useEffect, useState } from "react";
import { IScreening, IUpcomingScreening } from "@/interfaces/IScreening";
import { getUpcomingScreenings } from "@/util/apiUtils";
import loadingDots from "@/assets/loading_dots.svg";
import { sortScreeningsByDate } from "@/util/sortingUtils";
import { getRoundedCurrentTimeIsoString } from "@/util/timeUtils";
import ScreeningFilter from "@/components/ScreeningFilter/ScreeningFilter";



const UpcomingScreenings = () => {
    const [sortedUpcoming, setSortedUpcoming] = useState<IUpcomingScreening>();
    const [numberOfUpcoming, setNumberOfUpcoming] = useState<number>(20);
    const [theaterFilter, setTheaterFilter] = useState<number[]>([]);

    const fetchScreenings = async () => {
        const dateString = getRoundedCurrentTimeIsoString();
        const upcomingScreenings: IScreening[] = 
            await fetch(getUpcomingScreenings(dateString, numberOfUpcoming, theaterFilter))
                .then((res) => res.json())
                .then((res) => res.data)

            const sortedScreening = sortScreeningsByDate(upcomingScreenings)
            setSortedUpcoming(sortedScreening);
    }

    const handleFilterChange = (filterObject: Record<number, boolean>)  => {
        Object.entries(filterObject).forEach(([key, filterOn]) => {
            const numericKey = parseInt(key, 10);
            if (theaterFilter.includes(numericKey) && !filterOn) {
                const modifiedFilter = theaterFilter;
                modifiedFilter.splice(modifiedFilter.indexOf(numericKey), 1);
                setTheaterFilter([...modifiedFilter]);
            } else if (!theaterFilter.includes(numericKey) && filterOn) {
                const modifiedFilter = theaterFilter;
                modifiedFilter.push(numericKey);
                setTheaterFilter([...modifiedFilter])
            }
        })
    }


    useEffect(() => {
        fetchScreenings();
    }, [theaterFilter, numberOfUpcoming])

    if (sortedUpcoming === undefined) {
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
            <ScreeningFilter filterChange={handleFilterChange}/>
            <div className="upcoming-screenings-container">
                {Object.keys(sortedUpcoming).map((date: string, index: number) => {
                    return(<UpcomingSection 
                        key={index}
                        sectionDate={date} 
                        entries={sortedUpcoming[date]} 
                    />)
                })}
            </div>
        </div>
    )
}

export default UpcomingScreenings;