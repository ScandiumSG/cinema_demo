import { useEffect, useState } from "react";
import "./ScreeningFilter.css"
import ITheater from "@/interfaces/ITheater";
import { getTheaters } from "@/util/apiUtils";
import TheaterFilterItem from "./TheaterFilterItem/TheaterFilterItem";

interface IScreeningFilterProps {
    filterChange: (theaterFilter: Record<number, boolean>) => void;
}

const ScreeningFilter: React.FC<IScreeningFilterProps> = ({ filterChange} ) => {
    const [theaters, setTheaters] = useState<ITheater[]>();
    const [theaterFilter, setTheaterFilter] = useState<Record<number, boolean>>();

    const retrieveTheaterOptions = async () => {
        const theaters: ITheater[] = await fetch(getTheaters())
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => {setTheaters(res); return res})

        // Generate the theaterFilter as a number-boolean collection
        const theaterFilterRecord = theaters.reduce((acc, theater) => {
            acc[theater.id] = false;
            return acc;
        }, {} as Record<number, boolean>)
        setTheaterFilter(theaterFilterRecord);
    }

    const handleTheaterFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (theaterFilter) {
            setTheaterFilter({...theaterFilter, [e.target.value]: e.target.checked})
        }
    }

    useEffect(() => {
        if (theaterFilter) {
            filterChange(theaterFilter)
        }
    }, [theaterFilter])

    useEffect(() =>  {
        retrieveTheaterOptions();
    }, [])

    if (!theaters || !theaterFilter) {
        return(<div>Loading...</div>)
    }

    return (
        <div className="screening-filter-parent-container">
            <div>
                Date change
            </div>
            <div>
                {theaters.map((theater: ITheater, index: number) => (
                    <TheaterFilterItem 
                        key={index} 
                        theater={theater} 
                        tracker={theaterFilter}
                        handleChange={handleTheaterFilterChange}
                    />
                ))}
            </div>
        </div>
    )
}

export default ScreeningFilter;