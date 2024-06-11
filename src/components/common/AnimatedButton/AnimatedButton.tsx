import "./AnimatedButton.css"
import spinner from "@/assets/loading_spin.svg";

interface IAnimatedButtonProps {
    isLoading: boolean,
    submitText: string,
    submitOnClick: () => void,
    clickText: string,
}

const AnimatedButton: React.FC<IAnimatedButtonProps> = ({ isLoading, submitText, submitOnClick, clickText}) => {

    if (!isLoading) {
        return(
            <button 
                className="purchase-modal-confirm-button standard-button"
                onClick={() => submitOnClick()}
            >
                {submitText}
            </button>
        )
    }

    return(
            <button 
                className="purchase-modal-confirm-button-verify standard-button"
            >
                <img className="loading-spinner" src={spinner} alt="Verifying..."/>
                <span>{clickText}</span>
            </button>
    )
}

export default AnimatedButton;