import "./LandingPage.css";
import { useContext, useEffect, useState } from "react";
import loading from "@/assets/loading_dots.svg";
import { getFrontpageHighlight } from "@/util/apiUtils";
import { IMovie } from "@/interfaces/IMovie";
import StarRating from "@/components/common/StarRating/StarRating";
import { timeCalculator } from "@/util/timeUtils";
import { useNavigate } from "react-router-dom";
import { IUserContext } from "@/interfaces/UserInterfaces";
import { userContext } from "@/util/context";
import PurchaseHistory from "@/components/ProfileView/PurchaseHistory/PurchaseHistory";

const LandingPage = () => {
    const [highlightData, setHighlightData] = useState<IMovie>();
    const { user } = useContext<IUserContext>(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        retrieveHighlight();
    }, []);

    const retrieveHighlight = async () => {
        await fetch(getFrontpageHighlight())
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setHighlightData({ ...res }));
    };

    //@ts-ignore
    const navigateToScreening = (id: number) => {
        // TODO: Change to show only upcoming screenings of the specified movie id
        navigate("/screening/upcoming");
    };

    if (highlightData === undefined) {
        return (
            <div className="landing-page-parent-container">
                <p>Loading...</p>
                <img src={loading} alt="Loading indicator" />
            </div>
        );
    }

    return (
        <div className="landing-page-parent-container">
            <div className="landing-page-highlight-container">
                <h2 className="landing-page-movie-highlight-title">
                    Best rated active movie
                </h2>
                <div
                    className="landing-page-movie-highlight-container clickable"
                    onClick={() => navigateToScreening(highlightData.id)}
                >
                    <h3 className="landing-page-movie-highlight-movie-title">
                        {highlightData.title}
                    </h3>
                    <StarRating
                        rating={highlightData.averageRating}
                    ></StarRating>
                    <span>
                        Runtime: {timeCalculator(highlightData.runtime)}
                    </span>
                </div>
            </div>
            {user ? (
                <div className="landing-page-history-container">
                    <h2 className="landing-page-movie-highlight-title">
                        My tickets
                    </h2>
                    <PurchaseHistory user={user} showHeader={false} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default LandingPage;
