import { useEffect, useState } from "react";
import "./PageLink.css"
import { useLocation, useNavigate } from "react-router-dom";

interface linkProps {
    displayName: string,
    routeName: string,
}

const PageLink: React.FC<linkProps> = ({displayName, routeName}) => {
    const [activeLink, setActiveLink] = useState<boolean>(false)

    const navigate = useNavigate();
    const location = useLocation();

    const routeTo = (destination: string) => {
        navigate(destination);
    }

    useEffect(() => {
        if (location.pathname === "/" && routeName === "/") {
            setActiveLink(true);
        } else if (location.pathname.endsWith(routeName)) {
            setActiveLink(true);
        } else {
            setActiveLink(false);
        }
    }, [location.pathname, routeName])

    return(
        <div 
            className={activeLink ? "page-links-container active": "page-links-container"}
            onClick={() => routeTo(routeName)}
        >
            <h4>{displayName}</h4>
        </div>       
    )
}

export default PageLink;