import "./FooterComponent.css"

const FooterComponent = () => {
    return(
        <div className="footer-component-parent-container">
            <div>
                <a href="/about/">
                    About
                </a>
            </div>
            <div>
                <a href="https://github.com/ScandiumSG/cinema_demo">
                    Source Code
                </a>
            </div>
        </div>
    )
}

export default FooterComponent;