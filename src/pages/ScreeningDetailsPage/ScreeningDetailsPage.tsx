import { useNavigate, useParams } from "react-router-dom";
import "./ScreeningDetailsPage.css"
import { useEffect, useState } from "react";
import { IScreening } from "@/interfaces/IScreening";
import { getScreeningDetails } from "@/util/apiUtils";
import { translateDateTimeString } from "@/util/timeUtils";
import ScreeningMovieDetails from "@/components/ScreeningMovieDetails/ScreeningMoviedetails";

// path="/screening/:screeningId/:movieId"

const ScreeningDetailsPage = () => {
    const { movieId, screeningId } = useParams();
    const [screeningData, setScreeningData] = useState<IScreening>();
    const navigate = useNavigate();

    const fetchData = async () => {
        if (movieId === undefined || screeningId === undefined) {
            return;
        }

        await fetch(
            getScreeningDetails(parseInt(movieId), parseInt(screeningId)))
            .then((res) => {
                if (res.status === 404) {
                    throw new Error("404 - Not found");
                }
                return res;
            })
            .then((res) => res.json())
            .then((res) => setScreeningData({...res.data}))
            .catch((err: Error) => console.log(err.message));
    }

    useEffect(() => {
        console.log(screeningData)
    }, [screeningData])

    useEffect(() => {
        fetchData();
    }, [movieId, screeningId])

    if (screeningData === undefined) {
        return(
            <div className="screening-error-container">
                Could not find the provided screening
                <button onClick={() => navigate("/")}>Return to frontpage</button>
            </div>
        )
    }

    return(
        <div className="screening-details-page-parent-container">
            <div className="screening-details-page-container  highlight">
                <div className="screening-details-header">
                    <h2>
                        {screeningData.theater.name}
                    </h2>
                    <p>
                        {translateDateTimeString(screeningData.startTime)}
                    </p>
                </div>
                <ScreeningMovieDetails movie={screeningData.movie} />
                <div>                
                    <span>Movie id: </span>
                    <span>{movieId}</span>
                </div>
                <div>
                    <span>Screening id: </span>
                    <span>{screeningId}</span>
                </div>
            </div>
        </div>
    )
}

export default ScreeningDetailsPage;