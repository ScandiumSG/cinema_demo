import { useContext } from "react";
import "./UserOverview.css"
import { IUserContext } from "@/interfaces/UserInterfaces";
import { userContext } from "@/util/context";
import AccountIcon from "@/components/common/AccountIcon/AccountIcon";

const UserOverview = () => {
    const {user, setUser, showLoginModal} = useContext<IUserContext>(userContext);

    const logOut = () => {
        setUser(undefined);
    }

    if (!user) {
        return (
            <div className="user-overview-outer-container">
                <button 
                    className="user-over-view-button standard-button" 
                    onClick={() => showLoginModal()}
                >
                    Login
                </button>
            </div>
        )
    }

    return(
        <div className="user-overview-outer-container">
            <button 
                className="standard-button"
                onClick={() => logOut()}
            >
                Logout
            </button>
            <AccountIcon />
        </div>
    )
}

export default UserOverview;