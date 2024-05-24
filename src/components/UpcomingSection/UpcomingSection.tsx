import { IScreening } from "@/interfaces/IScreening";
import "./UpcomingSection.css"
import { useEffect, useState } from "react";

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
        <div>
            <h3>{dateString}</h3>
            {entries.map((Screening: IScreening, index: number) => {
                return(
                    <div key={index}>
                        <span>{Screening.id}</span>
                        <span>{Screening.movie.title}</span>
                        <span>{Screening.theater.name}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default UpcomingSection;