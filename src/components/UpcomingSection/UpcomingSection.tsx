import { IScreening } from "@/interfaces/IScreening";
import "./UpcomingSection.css"
import { useEffect, useState } from "react";
import UpcomingCard from "./UpcomingCard/UpcomingCard";
import { determineDayString } from "@/util/timeUtils";

interface IUpcomingInput {
    sectionDate: string,
    entries: IScreening[],
}

const UpcomingSection: React.FC<IUpcomingInput> = ({sectionDate, entries}) => {
    const [dateString, setDateString] = useState<string>(sectionDate)

    useEffect(() => {
        setDateString(determineDayString(sectionDate));
    }, [sectionDate])

    return(
        <div className="upcoming-section-container">
            <h2 className="upcoming-section-header">{dateString}</h2>
            <div className="upcoming-card-list-container">
                {entries.map((Screening: IScreening, index: number) => {
                    return(
                        <UpcomingCard key={index} screening={Screening}/>
                    )
                })}
            </div>
        </div>
    )
}

export default UpcomingSection;