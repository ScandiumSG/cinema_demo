import { useContext, useEffect, useState } from "react";
import LoginModal from "../common/loginModal/LoginModal";
import "./HeaderComponent.css"
import { IUserContext } from "@/interfaces/UserInterfaces";
import { userContext } from "@/util/context";
import SmallHeader from "./SmallHeader/SmallHeader";
import LargeHeader from "./LargeHeader/LargeHeader";

const HeaderComponent = () => {
    const { loginModal } = useContext<IUserContext>(userContext);
    const [isDesktop, setDesktop] = useState<boolean>(window.innerWidth > 600);

    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth > 600) {
                setDesktop(true);
            } else {
                setDesktop(false)
            }
        }
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        }

    }, [])

    return (
        <>
        {loginModal && <LoginModal />}
        <header className="header-container">
        {isDesktop ? 
            <LargeHeader />
        : 
            <SmallHeader />
        }
        </header>
        </>
    )
}

export default HeaderComponent;