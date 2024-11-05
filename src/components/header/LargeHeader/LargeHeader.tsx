import PageLinks from "./PageLinks/PageLinks";
import UserOverview from "../UserOverview/UserOverview";
import logo from "@/assets/logos/logo_relaxed_no_bg.png";
import { useContext } from "react";
import { IHeaderNavigation } from "@/interfaces/IUtils";
import { headerNavigationContext } from "@/util/context";

const LargeHeader = () => {
    const { toFrontpage } = useContext<IHeaderNavigation>(
        headerNavigationContext
    );

    return (
        <>
            <div
                className="header-cinema-logo clickable"
                onClick={() => toFrontpage()}
            >
                <img className="header-logo-image" src={logo} />
            </div>
            <PageLinks />
            <UserOverview />
        </>
    );
};

export default LargeHeader;
