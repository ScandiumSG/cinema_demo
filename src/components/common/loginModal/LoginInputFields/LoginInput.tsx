import { ILoginCredentials } from "@/interfaces/UserInterfaces";
import "./LoginInput.css"
import { ChangeEvent } from "react";

interface ILoginProps {
    loginData: ILoginCredentials,
    emailChange: (e: ChangeEvent<HTMLInputElement>) => void,
    passwordChange: (e: ChangeEvent<HTMLInputElement>) => void;
    enterSubmit: (e: string) => void,
    errorMessage: string,
}

const LoginInput: React.FC<ILoginProps> = ({loginData, emailChange, passwordChange, enterSubmit, errorMessage}) => {
    return(
        <>
            <div className="login-modal-input-area">
                <span>Email:</span>
                <input 
                    id="email" 
                    onChange={(e) => emailChange(e)}
                    value={loginData["email"]}
                    />
            </div>
            <div className="login-modal-input-area">
                <span>Password:</span>
                <input 
                    id="password" 
                    type="password" 
                    onChange={(e) => passwordChange(e)}
                    onKeyDown={(e) => enterSubmit(e.key)}
                    value={loginData["password"]}
                    />
            </div>
            {errorMessage !== "" ? <span color="red">{errorMessage}</span> : <></>}
        </>
    )
}

export default LoginInput;