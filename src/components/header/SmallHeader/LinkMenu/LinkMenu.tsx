import { useContext, useState } from "react";
import "./LinkMenu.css"
import { IHeaderNavigation, INavigationItem } from "@/interfaces/IUtils";
import { headerNavigationContext } from "@/util/context";
import { useNavigate } from "react-router-dom";

const LinkMenu = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const navigate = useNavigate();
    const { navItems } = useContext<IHeaderNavigation>(headerNavigationContext);

    const navigateTo = (route: string) => {
        setShowDropdown(!showDropdown);
        navigate(route);
    }

    return(
        <div className="header-dropdown-parent-container">
            <div 
                className={showDropdown ? "header-dropdown-button-container clickable active" : "header-dropdown-button-container clickable"}
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <img 
                    src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/three-horizontal-lines-outline-icon.png" 
                    className="header-dropdown-button"
                />
            </div>
            {showDropdown && <div className="header-dropdown">
                {navItems.map((nav: INavigationItem, index: number) => (
                    <div 
                        key={index}
                        onClick={() => navigateTo(nav.route)}
                        className="header-dropdown-item clickable"
                    >
                        {nav.display}
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default LinkMenu;