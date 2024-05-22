import { useState } from 'react'
import './App.css'
import HeaderComponent from "@/components/header/HeaderComponent";
import { userContext } from './util/context';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import MovieOverviewPage from './pages/MovieOverview/MovieOverviewPage';

function App() {
  const [user, setUser] = useState({})
  const [showModal, setShowModal] = useState<boolean>(true);

  const showLoginModal = () => {
    setShowModal(!showModal);
  }

  return (
    <>
      <userContext.Provider
        value={{
          user: user, 
          setUser: setUser, 
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