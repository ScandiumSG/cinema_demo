import { useParams } from "react-router-dom";
import "./MoviePage.css"
import { useEffect, useState } from "react";
import { IMovieDetails } from "@/interfaces/IMovie";
import { getSpecificMovieById } from "@/util/apiUtils";
import { timeCalculator } from "@/util/timeUtils";
import loading from "@/assets/loading_dots.svg"
import UpcomingScreeningList from "@/components/UpcomingScreeningList/UpcomingScreeningList";
import { purchaseModalContext } from "@/util/context";
import PurchaseModal from "@/components/PurchaseModal/PurchaseModal";

const MoviePage = () => {
    const [movieData, setMovieData] = useState<IMovieDetails>();
    const { id } = useParams();
    const [showPurchase, setShowPurchase] = useState<boolean>(true);
    const [showSeatingMap, setShowSeatingMap] = useState<boolean>(false);
    
    const retrieveData = async (index: number) => {
        await fetch(getSpecificMovieById(index))
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setMovieData({...res}))
    }

    const displayPurchase = () => {
        setShowPurchase(!showPurchase);
    }

    const displaySeating = () => {
        setShowSeatingMap(!showSeatingMap);
    }

    useEffect(() => {
        if (id !== undefined) {
            const parsedId = parseInt(id);
            if (parsedId !== undefined) {
                retrieveData(parsedId);
            }
        }
    }, [id])

    if (movieData === undefined) {
        return(
            <div className="movie-page-parent-container">
                <p>Loading...</p>
                <img src={loading} alt="Loading indicator"/>
            </div>
        )
    }

    return(
        <purchaseModalContext.Provider
            value={{
                showPurchase: showPurchase, 
                setShowPurchase: displayPurchase, 
                showSeatingMap: showSeatingMap,
                setShowSeatingMap: displaySeating
            }}
      >
        {showPurchase && <PurchaseModal />}
        <div className="movie-page-parent-container scrollable">
            <div className="movie-page-header-information">
                <h2>{movieData?.title}</h2>
            </div>
            <div className="movie-page-center-container">
                <div className="movie-page-image">
                    <img src="https://image.tmdb.org/t/p/original/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg" />
                </div>
                <div className="movie-page-upcoming-screenings">
                    <UpcomingScreeningList movieId={movieData.id}/>
                </div>
            </div>
            <div className="movie-page-information-section">
                <div className="movie-page-information-description">
                    <span>
                        {movieData?.description}
                    </span>
                </div>
                <div className="movie-page-information-runtime">
                    <span>
                    🕔 {timeCalculator(movieData.runtime)}
                    </span>
                </div>
                <div className="movie-page-information-age-rating">
                    Rated: {movieData.rating}
                </div>
            </div>
        </div>
        </purchaseModalContext.Provider>
    )
}

export default MoviePage;