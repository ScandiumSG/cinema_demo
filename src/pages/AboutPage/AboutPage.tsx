import "./AboutPage.css"

const AboutPage = () => {
    return(
        <div className="about-page-parent-container">
            <div className=" about-page-content">
                <h2 className="about-page-subheader">About this website</h2>
                <p>
                    Welcome to [name TBD], a interactive cinema experience. This project is created to both to maintain skills related to full-stack development and to learn about practical use cases for SVG components.
                </p>
            </div>
            <div className="about-page-content">
                <h3 className="about-page-subheader">Website content</h3>
                <p>
                    The website offers a overview of upcoming screenings, a more detailed look at movies, and user login/registration. Each of these primary component should be robust, simple to use, and responsive. 
                </p>
            </div>
            <div className="about-page-content">
                <h3 className="about-page-subheader">Technology</h3>
                <p>
                    The website is created using Typescript and React, through Vite. 
                </p>
            </div>
        </div>
    )
}

export default AboutPage;