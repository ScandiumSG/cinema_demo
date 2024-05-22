import LoginModal from "../common/loginModal/LoginModal";
import "./HeaderComponent.css"
import UserOverview from "./UserOverview/UserOverview";

const HeaderComponent = () => {

    return (
        <header className="header-container">
            <LoginModal />
            <UserOverview/>
        </header>
    )
}

export default HeaderComponent;