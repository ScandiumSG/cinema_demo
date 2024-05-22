import "./PageLinks.css"
import PageLink from "./PageLink/PageLink";

const PageLinks = () => {

    return(
        <div className="page-links-parent-container">
            <PageLink displayName="Frontpage" routeName="/"/>     
            <PageLink displayName="Movies" routeName="movies" />
        </div>
    )
}

export default PageLinks;