import { useContext } from "react";
import "./UserOverview.css"
import { IUserContext } from "@/interfaces/UserInterfaces";
import { userContext } from "@/util/context";

const UserOverview = () => {
    const {user, setUser, showLoginModal} = useContext<IUserContext>(userContext);

    const logOut = () => {
        setUser(undefined);
    }

    return(
        <div>
            {!user ? 
            <button onClick={() => showLoginModal()}>Login</button> 
            : 
            <button onClick={() => logOut()}>Logout</button>
            }
        </div>
    )
}

export default UserOverview;