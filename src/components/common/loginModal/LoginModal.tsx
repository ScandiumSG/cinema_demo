import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./LoginModal.css"
import { ILoginCredentials, IUserContext } from "@/interfaces/UserInterfaces";
import { loginUrl } from "@/util/apiPaths";
import { userContext } from "@/util/context";

const defaultLoginData = {
    email: "",
    password: "",
}

const LoginModal = () => {
    const { loginModal, showLoginModal } = useContext<IUserContext>(userContext);
    const [invalidCredentials, setInvalidCredentials] = useState<string>("");
    const [loginData, setLoginData] = useState<ILoginCredentials>({
        email: sessionStorage.getItem("login_attempt_email") || "",
        password: ""
    })

    useEffect(() => {
        setLoginData({
            email: sessionStorage.getItem("login_attempt_email") || "",
            password: ""
        })
    }, [loginModal])

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        sessionStorage.setItem("login_attempt_email", e?.target?.value);
        setLoginData({...loginData, [e.target.id]: e.target.value})
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, [e.target.id]: e.target.value});
    }

    const postLoginCredentials = async () => {
        let fetchFailedFlag = false;
        if (loginData.email === "" ) {
            setInvalidCredentials("Enter your email")
            return;
        } else if (loginData.password === "") {
            setInvalidCredentials("Enter your password")
            return;
        } 

        const loginOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(loginData)
        }

        await fetch(loginUrl(), loginOptions)
            .then((res) => {
                if (res.status === 400) {
                    fetchFailedFlag = true;
                    return res.json();
                } else {
                    return res.json();
                }
            })
            .then((res) => {
                if (fetchFailedFlag) { throw new Error(res) } 
                else {
                    setInvalidCredentials("");
                    return res;
                }})
            .then((res) => {
                sessionStorage.setItem("login_claim", JSON.stringify(res));
            })
            .then(() => resetModal())
            .catch((err: Error) => {
                setInvalidCredentials(err.message)
            })
    }

    const resetModal = () => {
        setLoginData(defaultLoginData);
        sessionStorage.removeItem("login_attempt_email");
        showLoginModal();
    }

    return(
        <div className="login-modal-container" hidden={!loginModal}>
            <h4>Log in</h4>
            <div className="login-modal-input-area">
                <span>Email:</span>
                <input 
                    id="email" 
                    onChange={(e) => handleEmailChange(e)}
                    value={loginData["email"]}
                />
            </div>
            <div className="login-modal-input-area">
                <span>Password:</span>
                <input 
                    id="password" 
                    type="password" 
                    onChange={(e) => handlePasswordChange(e)}
                    value={loginData["password"]}
                />
            </div>
            {invalidCredentials !== "" ? <span color="red">{invalidCredentials}</span> : <></>}
            <div className="login-modal-button-container">
                <button 
                    className="login-modal-button login-modal-cancel" 
                    onClick={() => showLoginModal()}
                >
                    Cancel
                </button>
                <button 
                    className="login-modal-button login-modal-submit" 
                    onClick={() => postLoginCredentials()}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default LoginModal;