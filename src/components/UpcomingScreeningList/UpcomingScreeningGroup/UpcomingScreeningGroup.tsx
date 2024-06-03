import { IScreening, IUpcomingScreening } from "@/interfaces/IScreening";
import "./UpcomingScreeningGroup.css"
import { useEffect, useState } from "react";
import { sortScreeningsByDate } from "@/util/sortingUtils";
import ScreeningItem from "./ScreeningItem/ScreeningItem";

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
            {groupedScreenings!.map((screening: IScreening, index: number) => {
                return(
                    <ScreeningItem key={index} screening={screening}/>
                )
            })}
        </div>
    )
}

export default UpcomingScreeningGroup;