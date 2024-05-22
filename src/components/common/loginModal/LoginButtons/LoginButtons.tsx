import "./LoginButtons.css"
import spinner from "@/assets/loading_spin.svg";

interface ILoginButtons {
    showModal: () => void,
    submitCredentials: () => void,
    isLoading: boolean
}

const LoginButtons: React.FC<ILoginButtons> = ({showModal, submitCredentials, isLoading}) => {
    return(
        <div className="login-modal-button-container">
            <button 
                className="login-modal-button login-modal-cancel" 
                onClick={() => showModal()}
            >
                Cancel
            </button>
            { !isLoading ? 
                <button 
                    className="login-modal-button login-modal-submit" 
                    onClick={() => submitCredentials()}
                >
                    Log in
                </button>
                :
                <button className="login-modal-button login-modal-submit">
                    <img className="loading-spinner" src={spinner} alt="Verifying..."/>
                    <span>Verifying...</span>
                </button>
            }
        </div>
    )
}

export default LoginButtons;