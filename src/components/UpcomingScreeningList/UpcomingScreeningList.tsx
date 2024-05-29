import { useEffect, useState } from "react";
import "./UpcomingScreeningList.css"
import { IUpcomingScreening } from "@/interfaces/IScreening";
import { getUpcomingSpecificScreenings } from "@/util/apiUtils";
import UpcomingScreeningGroup from "./UpcomingScreeningGroup/UpcomingScreeningGroup";
import { sortScreeningsByDate } from "@/util/sortingUtils";

interface IScreeningListProps {
    movieId: number,
}

const UpcomingScreeningList: React.FC<IScreeningListProps> = ({movieId}) => {
    const [upcomingScreening, setUpcomingScreenings] = useState<IUpcomingScreening>()
    const [noUpcoming, setNoUpcoming] = useState<boolean>(false);
    const [numberOfScreenings, setNumberOfScreenings] = useState<number>(10);
    const currentDate: Date = new Date();

    const fetchScreenings = async () => {

        const fetchedScreenings = await fetch(getUpcomingSpecificScreenings(movieId, currentDate.toISOString(), numberOfScreenings))
            .then((res) => {
                if (res.status == 204) {
                    throw new Error("Found no screenings")
                }
                return res
            })
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => {console.log(res); setNoUpcoming(false); return res})
            .catch(() => setNoUpcoming(true))

        const sortedScreenings = sortScreeningsByDate(fetchedScreenings);
        setUpcomingScreenings(sortedScreenings);
    }

    useEffect(() => {
        fetchScreenings();
    }, [movieId])

    if (upcomingScreening === undefined) {
        return(
            <div>
                Loading...
            </div>
        )
    }

    if (noUpcoming) {
        return(
            <div>
                <h3>
                    No planned screenings. Check back later!
                </h3>
            </div>
        )
    }

    return(
        <div className="upcoming-specific-screening-list-parent-container">
            <h3>Upcoming screenings:</h3>
            {Object.keys(upcomingScreening!).map((date: string, index: number) => {
                return(<UpcomingScreeningGroup 
                    key={index}
                    date={date} 
                    screenings={upcomingScreening![date]} 
                />)
            })}
        </div>
    )
}

export default UpcomingScreeningList;