import { useNavigate, useParams } from "react-router-dom";
import "./ScreeningPage.css"
import { useEffect, useState } from "react";
import { getSpecificMovieById } from "@/util/apiUtils";
import ScreeningMovieDetails from "@/components/ScreeningMovieDetails/ScreeningMoviedetails";
import UpcomingScreeningList from "@/components/UpcomingScreeningList/UpcomingScreeningList";
import { IMovieDetails } from "@/interfaces/IMovie";
import { purchaseModalContext } from "@/util/context";
import PurchaseModal from "@/components/PurchaseModal/PurchaseModal";
import { IScreening } from "@/interfaces/IScreening";

// path="/screening/:movieId"

const ScreeningPage = () => {
    const { movieId } = useParams();
    const [movieData, setMovieData] = useState<IMovieDetails>();
    const [selectedScreening, setSelectedScreening] = useState<IScreening | undefined>();
    const [showPurchase, setShowPurchase] = useState<boolean>(true);
    const [showSeatingMap, setShowSeatingMap] = useState<boolean>(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        if (movieId === undefined) {
            return;
        }

        await fetch(
            getSpecificMovieById(parseInt(movieId)))
            .then((res) => {
                if (res.status === 404) {
                    throw new Error("404 - Not found");
                }
                return res;
            })
            .then((res) => res.json())
            .then((res) => setMovieData({...res.data}))
            .catch((err: Error) => console.log(err.message));
    }

    const displayPurchase = (screening: IScreening | undefined) => {
        setSelectedScreening(screening);
        setShowPurchase(!showPurchase);
    }

    const displaySeating = () => {
        setShowSeatingMap(!showSeatingMap);
    }

    useEffect(() => {
        fetchData();
    }, [movieId])

    if (movieData === undefined) {
        return(
            <div className="screening-error-container">
                Could not find the provided screening
                <button onClick={() => navigate("/")}>Return to frontpage</button>
            </div>
        )
    }

    return(
        <purchaseModalContext.Provider
        value={{
            setShowPurchase: displayPurchase, 
            showSeatingMap: showSeatingMap,
            setShowSeatingMap: displaySeating
        }}
        >
        {selectedScreening && <PurchaseModal screening={selectedScreening}/>}
        <div className="screening-page-parent-container">
            <div className="screening-page-container">
                <div className="screening-content-container">
                    <ScreeningMovieDetails movie={movieData} />
                    <div className="screening-upcoming-screenings">
                        <UpcomingScreeningList movieId={movieData.id}/>
                    </div>
                </div>
            </div>
        </div>
        </purchaseModalContext.Provider>
    )
}

export default ScreeningPage;