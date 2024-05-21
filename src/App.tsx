import { useState } from 'react'
import './App.css'
import HeaderComponent from "@/components/header/HeaderComponent";
import { userContext } from './util/context';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import MovieOverviewPage from './pages/MovieOverview/MovieOverviewPage';

function App() {
  const [user, setUser] = useState({})

  return (
    <>
      <userContext.Provider
        value={{user: user, setUser: setUser}}
      >

        <HeaderComponent />
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
      </userContext.Provider>
    </>
  )
}

export default App
