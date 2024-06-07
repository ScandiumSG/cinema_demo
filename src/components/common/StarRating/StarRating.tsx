import { useEffect, useState } from "react";
import "./StarRating.css"

const fullStarUrl = "https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-symbol-icon.png";
const halfStarUrl = "https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-half-yellow-icon.png";
const emptyStarUrl = "https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-line-yellow-icon.png";


const StarRating: React.FC<{rating: number}> = ({rating}) => {
    const [fullStars, setFullStars] = useState<number>(0);
    const [halfStars, setHalfStars] = useState<number>(0);
    const [emptyStars, setEmptyStars] = useState<number>(0);


    useEffect(() => {
        const full = Math.floor(rating);
        const half = rating % 1 !== 0 ? 1 : 0

        setFullStars(full);
        setHalfStars(half)
        setEmptyStars(5 - full - half)
    }, [rating])


    return (
        <div className="star-rating-container" title={rating.toString()} onClick={() => console.log(rating)}>
            {[...Array(fullStars)]?.map((_, index) => (
                <img key={index} src={fullStarUrl} className="star-rating-image full-star"/>
            ))}
            {[...Array(halfStars)]?.map((_, index) => (
                <img key={index} src={halfStarUrl} className="star-rating-image half-star"/>
            ))}
            {[...Array(emptyStars)]?.map((_, index) => (
                <img key={index} src={emptyStarUrl} className="star-rating-image empty-star"/>
            ))}
        </div>
    )
}

export default StarRating;