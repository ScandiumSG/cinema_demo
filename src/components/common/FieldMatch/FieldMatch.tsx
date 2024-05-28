import { useEffect, useState } from "react"
import "./FieldMatch.css"

interface IMatchProps {
    field1: string,
    field2: string,
    posString: string,
    negString: string,
    retFunc?: () => void,
}

const FieldMatch: React.FC<IMatchProps> = ({field1, field2, posString, negString}) => {
    const [matchValue, setMatchValue] = useState<number>(0);

    useEffect(() => {
        if (field1 == "" || field2 == "") {
            setMatchValue(0);
        } else if (field1 == field2) {
            setMatchValue(1);
        } else {
            setMatchValue(-1);
        }
    }, [field1, field2])

    if (matchValue == 1) {
        return(
            <div className="field-match-container">
                <span className="field-match-postive">
                    {posString}
                </span>
            </div>
        )
    } 
    
    if (matchValue == -1) {
        return(
            <div className="field-match-container">
                <span className="field-match-negative">
                    {negString}
                </span>
            </div>
        )
    }
}

export default FieldMatch;