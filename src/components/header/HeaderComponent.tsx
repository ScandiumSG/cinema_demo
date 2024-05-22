import { useContext } from "react";
import LoginModal from "../common/loginModal/LoginModal";
import "./HeaderComponent.css"
import { IUserContext } from "@/interfaces/UserInterfaces";
import { userContext } from "@/util/context";

const HeaderComponent = () => {
    const { showLoginModal } = useContext<IUserContext>(userContext);

    return (
        <header className="header-container">
            <LoginModal />
            <button onClick={() => showLoginModal()}>Login</button>
        </header>
    )
}

export default HeaderComponent;