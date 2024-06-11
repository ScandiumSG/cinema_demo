import { ChangeEvent, useState } from "react";
import "./RegisterAccount.css"
import { IRegisterCredentials, IRegistrationError } from "@/interfaces/UserInterfaces";
import RegisterAccountInputField from "./RegisterAccountInputfield/RegisterAccountInputField";
import { registerUrl } from "@/util/apiUtils";
import { useNavigate } from "react-router-dom";

const defaultValues: IRegisterCredentials = {
    "email": "",
    "username": "",
    "password": "",
}



const RegisterAccount = () => {
    const [accountData, setAccountData] = useState<IRegisterCredentials>(defaultValues);
    const [errorArray, setErrorArray] = useState<IRegistrationError[]>([]);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAccountData({...accountData, [e.target.id]: e.target.value})
    }

    const postAccountRequest = async () => {
        const postOptions = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify(accountData)
        }
        let errorSwitch = false;
        await fetch(registerUrl(), postOptions)
            .then((res) => {
                if (res.status === 400) {
                    errorSwitch = true;
                }
                return res;
            })
            .then((res) => res.json())
            .then((res) => {
                if (errorSwitch) {
                    setErrorArray([...res])
                } else {
                    setErrorArray([])
                }})
            .finally(() => {
                if (!errorSwitch) {
                    navigate("/");
            }})
    }

    return(
        <div className="register-account-parent-container">
            <div className="register-account-header-container">
                <h2>Register new account</h2>
            </div>
            <div className="register-account-input-container">
                <RegisterAccountInputField 
                    accountData={accountData}
                    handleChange={handleChange}
                    fieldId={"email"}
                    fieldType={"text"}
                    fieldDescription="Email address"
                    error={errorArray.find((e) => e.code.toLowerCase().includes("email")) || undefined}
                />
                <RegisterAccountInputField 
                    accountData={accountData}
                    handleChange={handleChange}
                    fieldId={"username"}
                    fieldType={"text"}
                    fieldDescription="Your username"
                    error={errorArray.find((e) => e.code.toLowerCase().includes("username")) || undefined}
                />
                <RegisterAccountInputField 
                    accountData={accountData}
                    handleChange={handleChange}
                    fieldId={"password"}
                    fieldType={"password"}
                    fieldDescription="Password"
                    error={errorArray.find((e) => e.code.toLowerCase().includes("password")) || undefined}
                />
            </div>
            <div className="register-account-button-container">
                <button
                    className="register-account-button cancel standard-button"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </button>
                <button
                    className="register-account-button submit standard-button"
                    onClick={() => postAccountRequest()}
                >
                    Register
                </button>
            </div>
        </div>
    )
}

export default RegisterAccount;