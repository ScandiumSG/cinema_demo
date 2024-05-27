import { IScreening } from "@/interfaces/IScreening";
import "./UpcomingSection.css"
import { useEffect, useState } from "react";
import UpcomingCard from "./UpcomingCard/UpcomingCard";

interface IUpcomingInput {
    sectionDate: string,
    entries: IScreening[],
}

const UpcomingSection: React.FC<IUpcomingInput> = ({sectionDate, entries}) => {
    const [dateString, setDateString] = useState<string>(sectionDate)

    const determineDayString = (inputDateString: string) => {
        const inputDate = new Date(inputDateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
      
        // Normalize the time parts to compare only date
        today.setHours(0, 0, 0, 0);
        tomorrow.setHours(0, 0, 0, 0);
        inputDate.setHours(0, 0, 0, 0);

        if (inputDate.getTime() === today.getTime()) {
            return "Today";
        } else if (inputDate.getTime() === tomorrow.getTime()) {
            return "Tomorrow";
        } else {
            const dateObject: Date = new Date(inputDateString);
            return dateObject.toLocaleDateString();
        }
    }

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