import "./LandingPage.css";
import { useEffect, useState } from "react";
import loading from "@/assets/loading_dots.svg";
import { getFrontpageHighlight } from "@/util/apiUtils";
import { IMovie } from "@/interfaces/IMovie";
import StarRating from "@/components/common/StarRating/StarRating";
import { timeCalculator } from "@/util/timeUtils";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [highlightData, setHighlightData] = useState<IMovie>();
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
            <h2 className="landing-page-movie-highlight-title">
                Best rated active movie
            </h2>
            <div
                className="landing-page-movie-highlight-container clickable"
                onClick={() => navigateToScreening(highlightData.id)}
            >
                <h3 className="landing-page-movie-highlight-title">
                    {highlightData.title}
                </h3>
                <StarRating rating={highlightData.averageRating}></StarRating>
                <span>Runtime: {timeCalculator(highlightData.runtime)}</span>
            </div>
        </div>
    );
};

export default LandingPage;
