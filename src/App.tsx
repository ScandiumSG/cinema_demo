import { useState } from 'react'
import './App.css'
import HeaderComponent from "@/components/header/HeaderComponent";
import { blurContext, userContext } from './util/context';

import { IUserData } from './interfaces/UserInterfaces';
import { readSessionStorage } from './util/userUtil';
import PageRouter from './PageRouter';
import FooterComponent from './components/Footer/FooterComponent';


function App() {
  const [user, setUser] = useState<IUserData|undefined>(readSessionStorage())
  const [showModal, setShowModal] = useState<boolean>(false);
  const [blurArray, setBlurArray] = useState<string[]>([]);

  const showLoginModal = () => {
    if (showModal === false) {
      addToBlurArray("Login");
    } else {
      removeFromBlurArray("Login");
    }
    setShowModal(!showModal);
  }

  const setUserData = (user?: IUserData) => {
    if (user !== undefined ) {
      setUser({...user});
      sessionStorage.setItem("login_claim", JSON.stringify(user))
    } else {
      setUser(undefined);
      sessionStorage.removeItem("login_claim");
    }
  }

  const addToBlurArray = (modalName: string) =>  {
    const tempBlurArray = blurArray;
    if (!tempBlurArray.includes(modalName)) {
      tempBlurArray.push(modalName)
    }
    setBlurArray([...tempBlurArray])
  }

  const removeFromBlurArray = (modalName: string) =>  {
    const tempBlurArray = [...blurArray];
    const modalIndex = tempBlurArray.indexOf(modalName);
    if (modalIndex === -1) {
      return;
    }
    tempBlurArray.splice(modalIndex, 1);
    setBlurArray(tempBlurArray);
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
        <blurContext.Provider
          value={{
            blurArray: blurArray,
            removeFromArray: removeFromBlurArray,
            addToArray: addToBlurArray,
          }}
        >
          <HeaderComponent />
          <PageRouter />
          <FooterComponent />
        </blurContext.Provider>
      </userContext.Provider>
    </>
  )
}

export default App
