import { useEffect, useState } from "react";
import "./ValidatePassword.css"
import { validatePassword } from "@/util/textValidationUtil";

interface IValidateProps {
    password: string,
    setStatus: (status: boolean) => void,
}

const ValidatePassword: React.FC<IValidateProps> = ({password, setStatus}) => {
    const [validationArray, setValidationArray] = useState(validatePassword(password))
    const [showDetails, setShowDetails] = useState<boolean>(false)

    useEffect(() => {
        if (validationArray.every((validation) => validation.valid)) {
            if (password.length > 0) {
                setStatus(true);
            } else {
                setStatus(false);
            }
            setShowDetails(false);
        } else {
            if (password.length > 0) {
                setShowDetails(true);
            }
        }
    }, [validationArray])

    useEffect(() => {setValidationArray(validatePassword(password))}, [password])

    if (!showDetails) {
        return(
            <div></div>
        )
    }

    return(
        <div className="password-validation-parent-container">
            <p className="password-validation-info-header">Password rules:</p>
            <ul className="password-validation-rule-list">
                {validationArray.map((rule, index) => {
                    return(
                        <li key={index} className={rule.valid ? "validate-password-rule-item valid" : "validate-password-rule-item invalid"}>
                        <span>{rule.name}</span>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ValidatePassword;