import { useEffect, useState } from "react";
import "./UpcomingScreeningList.css"
import { IScreening } from "@/interfaces/IScreening";
import { getUpcomingSpecificScreenings } from "@/util/apiUtils";
import UpcomingScreeningItem from "./UpcomingScreeningItem/UpcomingScreeningItem";

interface IScreeningListProps {
    movieId: number,
}

const UpcomingScreeningList: React.FC<IScreeningListProps> = ({movieId}) => {
    const [upcomingScreening, setUpcomingScreenings] = useState<IScreening[]>()
    const [noUpcoming, setNoUpcoming] = useState<boolean>(false);
    const [numberOfScreenings, setNumberOfScreenings] = useState<number>(5);
    const currentDate: Date = new Date();

    const fetchScreenings = async () => {

        await fetch(getUpcomingSpecificScreenings(movieId, currentDate.toISOString(), numberOfScreenings))
            .then((res) => {
                if (res.status == 204) {
                    throw new Error("Found no screenings")
                }
                return res
            })
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => {console.log(res); return res})
            .then((res) => setUpcomingScreenings([...res]))
            .catch(() => setNoUpcoming(true))
    }

    useEffect(() => {
        fetchScreenings();
    }, [movieId])

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
        <div className="upcoming-specific-screening-list-parent-container highlight">
            <h3>Upcoming screenings:</h3>
            <div>
                {upcomingScreening?.map((screening: IScreening, index: number) => {
                    return(
                        <UpcomingScreeningItem key={index} screening={screening}/>
                    )
                })}
            </div>
        </div>
    )
}

export default UpcomingScreeningList;