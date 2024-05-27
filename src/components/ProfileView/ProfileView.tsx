import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./ProfileView.css"
import { IUserContext, IUserData } from "@/interfaces/UserInterfaces";
import { userContext } from "@/util/context";
import InfoField from "./InfoField/InfoField";
import { userInfoUrl } from "@/util/apiUtils";

interface ITempData extends IUserData {
    password: string
}

const ProfileView = () => {
    const { user } = useContext<IUserContext>(userContext);
    const [tempUserdata, setTempUserdata] = useState<ITempData | undefined>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            setTempUserdata({...tempUserdata!, [e.target.id]: e.target.value});
    }

    const fieldsEdited = () => {
        if(user === undefined || tempUserdata === undefined) {
            return false;
        }
        if (user.email === tempUserdata.email && user.username === tempUserdata.username) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        const userData: any = user;
        userData.password = "";
        setTempUserdata(userData)
    }, [user])

    const submitChanges = async () => {
        const putData = {
            id: tempUserdata?.id,
            email: tempUserdata?.email,
            username: tempUserdata?.username,
            password: tempUserdata?.password,
        }
        console.log("Put data:", JSON.stringify(putData))

        const fetchOptions = {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify(putData)
        }
        await fetch(userInfoUrl(), fetchOptions);
    }

    // TODO: Fix this error handling
    if (tempUserdata === undefined) {
        return(
            <div>
                <h3>You are not logged in. </h3>
                <button>Login</button>
                <button>To frontpage</button>
            </div>
        )
    }

    return(
        <div className="profile-view-parent-container">
            <h2 className="profile-view-header">Profile information</h2>
            {tempUserdata!.role === "Admin" && <span>Role: {tempUserdata!.role}</span>}
            <InfoField 
                fieldId={"email"} 
                fieldValue={tempUserdata!.email} 
                labelValue={"Email"} 
                handleChange={handleChange} 
            />
            <InfoField 
                fieldId={"username"} 
                fieldValue={tempUserdata!.username} 
                labelValue={"Username"} 
                handleChange={handleChange} 
            />
            {fieldsEdited() && 
                <InfoField 
                    fieldId={"password"} 
                    fieldValue={tempUserdata.password} 
                    labelValue={"Password"} 
                    handleChange={handleChange} 
                    fieldType="password"
                />
            }
            {fieldsEdited() && 
                <button 
                    disabled={tempUserdata.password === ""}
                    onClick={() => submitChanges()}
                >
                    Submit changes
                </button>
            }
        </div>
    )
}

export default ProfileView;