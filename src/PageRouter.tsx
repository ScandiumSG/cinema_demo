import { useContext, useState } from "react";
import { IBlurContext } from "./interfaces/IUtils";
import { blurContext, purchaseModalContext } from "./util/context";
import MoviePage from './pages/MoviePage/MoviePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import UpcomingScreenings from './pages/UpcomingScreenings/UpcomingScreenings';
import ScreeningPage from './pages/ScreeningPage/ScreeningPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import MovieOverviewPage from './pages/MovieOverview/MovieOverviewPage';
import { IScreening } from "./interfaces/IScreening";
import PurchaseModal from "./components/PurchaseModal/PurchaseModal";

const PageRouter = () => {
    const [selectedScreening, setSelectedScreening] = useState<IScreening>();
    const [showPurchase, setShowPurchase] = useState<boolean>(false);
    const { blurArray, addToArray, removeFromArray } = useContext<IBlurContext>(blurContext);
    const [showSeatMap, setShowSeatMap] = useState<boolean>(false);

    const hidePurchaseModal = () => {
      console.log("hiding")
      removeFromArray("Purchase")
      setShowPurchase(false);
    }

    const displayPurchase = (screening: IScreening) => {
        setShowPurchase(true);
        addToArray("Purchase");
        if (screening) {
            setSelectedScreening({...screening});
        }
    }

    return(
        <>
        {(showPurchase && selectedScreening) && 
            <PurchaseModal 
                screening={{...selectedScreening}} 
                showSeatMap={showSeatMap} 
                setShowSeatMap={setShowSeatMap}
                removeDisplay={hidePurchaseModal}
            />
        }
        <div className={blurArray.length !== 0 ? "app-container background-blurred" : "app-container"}>
            <Routes>
              <Route 
                path="/"
                element={<LandingPage />}
                />
              <Route 
                path="/movies/"
                element={<MovieOverviewPage />}
                />
              <Route 
                path="/movies/:id"
                element={<MoviePage />}
                />
              <Route 
                path="/screening/:movieId/"
                element={
                    <purchaseModalContext.Provider
                    value={{
                        setShowPurchase: displayPurchase
                    }}>
                        <ScreeningPage />
                    </purchaseModalContext.Provider>
                }
                />
              <Route 
                path="screening/upcoming"
                element={<UpcomingScreenings />}
                />
              <Route 
                path="user/profile"
                element={<ProfilePage />}
                />
              <Route 
                path="/user/register/"
                element={<RegistrationPage />}
                /> 
              <Route // Send unknown paths back to landing page
                path="*"
                element={<Navigate replace to="/" />}
                />
            </Routes>
          </div>
        </>
    )
}

export default PageRouter;