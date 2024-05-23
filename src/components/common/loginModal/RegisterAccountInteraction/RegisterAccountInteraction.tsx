import { useNavigate } from "react-router-dom";
import "./RegisterAccountInteraction.css"

interface IRegisterFunctions {
    resetModal: () => void,
}

const RegisterAccountInteraction: React.FC<IRegisterFunctions> = ({ resetModal }) => {
    const navigate = useNavigate();
    
    return(
        <div className="login-modal-register-container">
            <span>Don't have an account?</span>
            <button className="login-modal-button" onClick={() => {resetModal(); navigate("user/register")}}>
                Register now
            </button>
        </div>
    )
}

export default RegisterAccountInteraction;