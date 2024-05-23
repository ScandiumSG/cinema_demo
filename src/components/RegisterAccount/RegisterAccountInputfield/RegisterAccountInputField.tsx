import { IRegisterCredentials, IRegistrationError } from "@/interfaces/UserInterfaces";
import "./RegisterAccountInputField.css"
import { ChangeEvent } from "react";

interface IAccountInputFieldValues {
    accountData: IRegisterCredentials,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    fieldId: keyof IRegisterCredentials,
    fieldType: string,
    fieldDescription: string,
    error?: IRegistrationError,
}

const RegisterAccountInputField: React.FC<IAccountInputFieldValues> = ({accountData, handleChange, fieldId, fieldType, fieldDescription, error}) => {
    return(
        <div>
            <div className="register-account-input-field-container">
                <label 
                    className="register-account-input-field-label"
                    htmlFor={fieldId}
                    >
                    {fieldDescription}
                </label>
                <input 
                    className="register-account-input-field-value"
                    id={fieldId}
                    type={fieldType}
                    value={accountData[fieldId]}
                    onChange={(e) => handleChange(e)}
                    />
            </div>
            {error !== undefined && <span className="registration-field-error">{error.description}</span>}
        </div>
    )
}

export default RegisterAccountInputField;