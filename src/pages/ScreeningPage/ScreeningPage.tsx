import { useNavigate, useParams } from "react-router-dom";
import "./ScreeningPage.css"
import { useEffect, useState } from "react";
import { getSpecificMovieById } from "@/util/apiUtils";
import ScreeningMovieDetails from "@/components/ScreeningMovieDetails/ScreeningMoviedetails";
import UpcomingScreeningList from "@/components/UpcomingScreeningList/UpcomingScreeningList";
import { IMovieDetails } from "@/interfaces/IMovie";

const ScreeningPage = () => {
    const { movieId } = useParams();
    const [movieData, setMovieData] = useState<IMovieDetails>();
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
            <div className="screening-page-parent-container">
                <div className="screening-page-container">
                    <h2 className="screening-movie-details-title">
                        {movieData.title}
                    </h2>
                    <div className="screening-content-container">
                        <img
                            className="screening-movie-details-poster"
                            src="https://image.tmdb.org/t/p/original/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg"
                        />
                        <div className="screening-upcoming-screenings">
                            <UpcomingScreeningList movieId={movieData.id}/>
                        </div>
                    </div>
                    <ScreeningMovieDetails movie={movieData} />
                </div>
            </div>
    )
}

export default ScreeningPage;