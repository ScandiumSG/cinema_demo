import "./PageLinks.css"
import PageLink from "./PageLink/PageLink";
import { useContext } from "react";
import { IHeaderNavigation, INavigationItem } from "@/interfaces/IUtils";
import { headerNavigationContext } from "@/util/context";

const PageLinks = () => {
    const { navItems } = useContext<IHeaderNavigation>(headerNavigationContext);

    return(
        <div className="page-links-parent-container">
            {navItems.map((nav: INavigationItem, index: number) => (
                <PageLink displayName={nav.display} routeName={nav.route} key={index}/>
            ))}
        </div>
    )
}

export default PageLinks;