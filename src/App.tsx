import { useState } from 'react'
import './App.css'
import HeaderComponent from "@/components/header/HeaderComponent";
import { userContext } from './util/context';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import MovieOverviewPage from './pages/MovieOverview/MovieOverviewPage';
import { IUserData } from './interfaces/UserInterfaces';
import { readSessionStorage } from './util/userUtil';
import MoviePage from './components/MoviePage/MoviePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ScreeningDetailsPage from './pages/ScreeningDetailsPage/ScreeningDetailsPage';
import UpcomingScreenings from './pages/UpcomingScreenings/UpcomingScreenings';

function App() {
  const [user, setUser] = useState<IUserData|undefined>(readSessionStorage())
  const [showModal, setShowModal] = useState<boolean>(false);

  const showLoginModal = () => {
    setShowModal(!showModal);
  }

  const setUserData = (user?: IUserData) => {
    if (user !== undefined ) {
      setUser({...user});
    } else {
      setUser(undefined);
      sessionStorage.removeItem("login_claim");
    }
  }

  return (
    <>
      <userContext.Provider
        value={{
          user: user, 
          setUser: setUserData, 
          showLoginModal: showLoginModal,
          loginModal: showModal
        }}
      >

        <HeaderComponent />
        <div className="app-container">
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
              path="/screening/:movieId/:screeningId"
              element={<ScreeningDetailsPage />}
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
      </userContext.Provider>
    </>
  )
}

export default App
