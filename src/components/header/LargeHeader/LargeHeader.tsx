import PageLinks from "./PageLinks/PageLinks";
import UserOverview from "../UserOverview/UserOverview";
import logo from "@/assets/logos/logo_relaxed_no_bg.png"

const LargeHeader = () => {
    return(
        <>
            <div className="header-cinema-logo">
                <img className="header-logo-image" src={logo}/>
            </div>
            <PageLinks />
            <UserOverview />
        </> 
    )
}

export default LargeHeader;