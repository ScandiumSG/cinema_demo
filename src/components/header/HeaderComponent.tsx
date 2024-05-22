import { useContext } from "react";
import LoginModal from "../common/loginModal/LoginModal";
import "./HeaderComponent.css"
import UserOverview from "./UserOverview/UserOverview";
import { IUserContext } from "@/interfaces/UserInterfaces";
import { userContext } from "@/util/context";

const HeaderComponent = () => {
    const { loginModal } = useContext<IUserContext>(userContext);

    return (
        <>
        {loginModal && <LoginModal />}
        <header className="header-container">
            <div className="header-cinema-logo">
                Hello
            </div>
            <UserOverview/>
        </header>
        </>
    )
}

export default HeaderComponent;