import { IScreening } from "@/interfaces/IScreening";
import "./UpcomingScreeningGroup.css"
import { useEffect, useState } from "react";
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
            <div className="upcoming-screening-group-card-container">
                {groupedScreenings!.map((screening: IScreening, index: number) => {
                    return(
                        <ScreeningItem key={index} screening={screening}/>
                    )
                })}
            </div>
        </div>
    )
}

export default UpcomingScreeningGroup;