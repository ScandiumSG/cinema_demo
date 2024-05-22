import { useNavigate } from "react-router-dom";
import "./RegisterAccount.css"

const RegisterAccount = () => {
    const navigate = useNavigate();
    
    return(
        <div className="login-modal-register-container">
            <span>Don't have an account?</span>
            <button className="login-modal-button" onClick={() => navigate("user/register")}>
                Register now
            </button>
        </div>
    )
}

export default RegisterAccount;