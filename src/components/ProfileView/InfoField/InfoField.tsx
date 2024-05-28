import "./InfoField.css"
import { ChangeEvent, useEffect, useState } from "react";

interface IInfoFieldProps {
    fieldId: string,
    fieldValue: string,
    labelValue: string,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    fieldType?: string,
}

const InfoField: React.FC<IInfoFieldProps> = ({fieldId, fieldValue, labelValue, handleChange, fieldType="text"}) => {
    const [allowEdit, setAllowEdit] = useState<boolean>(false);

    const toggleEdit = () => {
        setAllowEdit(!allowEdit);
    }

    useEffect(() => {
        if (fieldType === "password") {
            setAllowEdit(true);
        }
    }, [fieldType])

    return(
        <div className="info-field-container">
            <label className="info-field-label">
                {labelValue}:
            </label>
            <div className="info-field-value-container">
                <input 
                    id={fieldId}
                    className="info-field-value"
                    type={fieldType}
                    value={fieldValue}
                    disabled={!allowEdit}
                    onChange={(e) => handleChange(e)}
                />
                {fieldType !== "password" &&
                    <button
                        className="info-field-toggle-editable-button"
                        onClick={() => toggleEdit()}
                    >
                        Click
                    </button>
                }
            </div>
        </div>

    )
}

export default InfoField;