import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./LoginModal.css"
import { ILoginCredentials, IUserContext } from "@/interfaces/UserInterfaces";
import { loginUrl } from "@/util/apiUtils";
import { userContext } from "@/util/context";
import RegisterAccountInteraction from "./RegisterAccountInteraction/RegisterAccountInteraction";
import LoginInput from "./LoginInputFields/LoginInput";
import LoginButtons from "./LoginButtons/LoginButtons";

const defaultLoginData = {
    email: "",
    password: "",
}

const LoginModal = () => {
    const { loginModal, showLoginModal, setUser } = useContext<IUserContext>(userContext);
    const [invalidCredentials, setInvalidCredentials] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
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

    const enterSubmit = (event: string) => {
        if (event === "Enter" && !loading) {
            postLoginCredentials();
        }
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
        setLoading(true)
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
                setUser(res)
            })
            .then(() => resetModal())
            .catch((err: Error) => {
                setInvalidCredentials(err.message)
            })
            .finally(() =>  setLoading(false))
    }

    const resetModal = () => {
        setLoginData(defaultLoginData);
        sessionStorage.removeItem("login_attempt_email");
        showLoginModal();
    }

    return(
        <div className="login-modal-container">
            <h3>Log in</h3>
            <LoginInput 
                loginData={loginData}
                emailChange={handleEmailChange}
                passwordChange={handlePasswordChange}
                enterSubmit={enterSubmit}
                errorMessage={invalidCredentials}
            />
            <LoginButtons 
                showModal={showLoginModal}
                submitCredentials={postLoginCredentials}
                isLoading={loading}
            />
            <RegisterAccountInteraction resetModal={resetModal}/>
        </div>
    )
}

export default LoginModal;