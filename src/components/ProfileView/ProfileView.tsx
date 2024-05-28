import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./ProfileView.css"
import { IUserContext, IUserData } from "@/interfaces/UserInterfaces";
import { userContext } from "@/util/context";
import InfoField from "./InfoField/InfoField";
import { userInfoUrl } from "@/util/apiUtils";
import NoUserWarning from "./NoUserWarning/NoUserWarning";
import ChangePassword from "./ChangePassword/ChangePassword";

interface ITempData extends IUserData {
    password: string
}

const ProfileView = () => {
    const { user, setUser } = useContext<IUserContext>(userContext);
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
        if (user === undefined) {
            return;
        }
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

        const fetchOptions = {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify(putData)
        }
        await fetch(userInfoUrl(), fetchOptions)
            .then((res) => res.json())
            .then((res) => {
                setUser({...user!, 
                    email: res.data.email, 
                    username: res.data.userName
                })
                return res;
            })
            .then((res) => console.log(res));
    }

    if (tempUserdata === undefined || user === undefined) {
        return(
            <NoUserWarning />
        )
    }

    return(
        <div className="profile-view-parent-container">
            {tempUserdata!.role === "Admin" && 
            <div className="profile-view-special-role-notification">
                <p>Currently logged into a special account!</p>
                <p>Role: {tempUserdata!.role}</p>
            </div>
            }
            <div className="profile-personal-information-container top-rounded-corners">
                <h2 className="profile-view-header">Profile information</h2>
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
            <ChangePassword />
        </div>
    )
}

export default ProfileView;