import { IScreening, IUpcomingScreening } from "@/interfaces/IScreening";
import "./UpcomingScreeningGroup.css"
import { useEffect, useState } from "react";
import { sortScreeningsByDate } from "@/util/sortingUtils";
import UpcomingScreeningItem from "./UpcomingScreeningItem/UpcomingScreeningItem";

interface IScreeningProps {
    date: string,
    screenings: IScreening[],
}

const UpcomingScreeningGroup: React.FC<IScreeningProps> = ({date, screenings}) => {
    const [groupedScreenings, setGroupedScreenings] = useState<IScreening[]>()

    useEffect(() => {
        setGroupedScreenings([...screenings])
    }, [screenings])

    if (groupedScreenings === undefined) {
        return(
            <div>
            </div>
        )
    }

    return(
        <div className="upcoming-screening-group-parent-container">
            <span className="upcoming-screening-group-date-header">
                {date}
            </span>
            <div>
                {groupedScreenings!.map((screening: IScreening, index: number) => {
                    return(
                        <UpcomingScreeningItem key={index} screening={screening}/>
                    )
                })}
            </div>
        </div>
    )
}

export default UpcomingScreeningGroup;