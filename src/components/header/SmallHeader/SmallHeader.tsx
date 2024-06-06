import UserOverview from "../UserOverview/UserOverview";
import LinkMenu from "./LinkMenu/LinkMenu"

const SmallHeader = () => {
    return(
        <>
            <LinkMenu />
            <UserOverview />
        </>
    )
}

export default SmallHeader;