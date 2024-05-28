import { useNavigate } from "react-router-dom";
import "./NoUserWarning.css"
import { useContext } from "react";
import { IUserContext } from "@/interfaces/UserInterfaces";
import { userContext } from "@/util/context";

const NoUserWarning = () => {
    const navigate = useNavigate();
    const { showLoginModal } = useContext<IUserContext>(userContext);

    return(
        <div className="profile-view-no-profile-container">
            <h3>You are not logged in.</h3>
            <div className="profile-view-buttons-container">
                <button 
                    onClick={() => showLoginModal()}
                >
                    Login
                </button>
                <button
                    onClick={() => navigate("/")}
                >
                    Back to frontpage
                </button>
            </div>
        </div>
    )
}

export default NoUserWarning;