import { useEffect, useState } from "react";
import "./ScreeningFilter.css"
import ITheater from "@/interfaces/ITheater";
import { getTheaters } from "@/util/apiUtils";
import TheaterFilterItem from "./TheaterFilterItem/TheaterFilterItem";

interface IScreeningFilterProps {
    filterChange: (theaterFilter: Record<number, boolean>) => void;
}

const ScreeningFilter: React.FC<IScreeningFilterProps> = ({ filterChange} ) => {
    const [minimizedFilter, setMinimizedFilter] = useState<boolean>(true);
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

    if (minimizedFilter) {
        return(
            <div 
                className="screening-filter-minimized-parent-container" 
                onClick={() => setMinimizedFilter(false)}
            >
                <div>
                    Configure filters
                </div>
                <button 
                    className="screening-filter-show-filter-button"
                >
                    <img className="screening-filter-show-filter-button-icon" src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/filter-setting-icon.png" />
                </button>
            </div>
        )
    }

    return (
        <div className="screening-filter-parent-container">
            <div>
                Date change
            </div>
            <div>
                <span>Theater filter:</span>
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