import { ChangeEvent, useContext, useEffect, useState } from "react";
import InfoField from "../InfoField/InfoField";
import "./ChangePassword.css"
import { IUserContext, IUserPasswordChange } from "@/interfaces/UserInterfaces";
import { userContext } from "@/util/context";
import FieldMatch from "@/components/common/FieldMatch/FieldMatch";
import ValidatePassword from "./ValidatePassword/ValidatePassword";
import { userPasswordUrl } from "@/util/apiUtils";
import spinner from "@/assets/loading_spin.svg";

const ChangePassword = () => {
    const [showFields, setShowFields] = useState<boolean>(false);
    const { user } = useContext<IUserContext>(userContext);
    const [pwData, setPwData] = useState<IUserPasswordChange>()
    const [confirmPw, setConfirmPw] = useState<string>("")
    const [allowSubmit, setAllowSubmit] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>("");

    useEffect(() => {
        if (user === undefined) {
            return;
        }
        setPwData({
            id: user!.id,
            oldPassword: "",
            newPassword: "",
        })
        setConfirmPw("")
    }, [user])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "newPasswordConfirm") {
            setConfirmPw(e.target.value);
        }  else {
            setPwData({...pwData!, [e.target.id]: e.target.value});
        }
    }

    const submitPasswordChange = async () => {
        setIsLoading(true);
        const options = {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify(pwData)
        }

        await fetch(userPasswordUrl(), options)
            .then((res) => {
                if (res.status !== 201) {
                    throw new Error("Invalid password.");
                } else {
                    setSubmitError("");
                };
                return res;
            })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .then(() => resetData())
            .finally(() => setIsLoading(false))
            .catch((err: Error) => {
                setSubmitError(err.message);
            })

    }

    const resetData = () => {
        setIsLoading(false);
        setAllowSubmit(false);
        setShowFields(false);
        setPwData({
            id: user!.id,
            oldPassword: "",
            newPassword: "",
        })
        setConfirmPw("")
    }

    if (user === undefined) {
        return(<div></div>)
    }

    if (!showFields) {
        return(
            <div 
                className="profile-change-password-container rounded-corners"
            >
                <div
                    className="profile-change-password-show-element clickable"
                    onClick={() => setShowFields(true)}
                >
                    Change password
                </div>
            </div>
        )
    }

    return(
        <div className="profile-change-password-container rounded-corners">
            <div className="profile-change-password-close-container">
                <button
                    className="profile-change-password-hide-element"
                    onClick={() => setShowFields(false)}
                >
                    Close  X
                </button>
            </div>
            <h2 className="profile-view-header">Change password</h2>
            <InfoField 
                fieldId={"oldPassword"} 
                fieldValue={pwData!.oldPassword} 
                labelValue={"Current password"} 
                handleChange={handleChange} 
                fieldType="password"
            />
            <InfoField 
                fieldId={"newPassword"} 
                fieldValue={pwData!.newPassword} 
                labelValue={"New password"} 
                handleChange={handleChange} 
                fieldType="password"
            />
            <InfoField 
                fieldId={"newPasswordConfirm"} 
                fieldValue={confirmPw} 
                labelValue={"Re-enter password"} 
                handleChange={handleChange} 
                fieldType="password"
            />
            <FieldMatch 
                field1={confirmPw}
                field2={pwData!.newPassword}
                posString="Passwords match!"
                negString="Passwords do not match!"
            />
            <ValidatePassword 
                password={pwData!.newPassword} 
                setStatus={setAllowSubmit}
            />
            {submitError != "" && <span className="profile-view-password-submit-error">{submitError}</span>}
            {(allowSubmit && pwData!.newPassword == confirmPw) && (!isLoading ? 
                    <button 
                        className="green-button" 
                        onClick={() => submitPasswordChange()}
                    >
                        Change password
                    </button>
                    :
                    <button className="green-button">
                        <img className="loading-spinner" src={spinner} alt="Verifying..."/>
                        <span>Verifying...</span>
                    </button>
            )}
        </div>
    )
}

export default ChangePassword;