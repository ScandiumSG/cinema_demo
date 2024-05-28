import React from 'react'

interface ITemplateProps {
    onSeatClick: (e: any) => void;
}

/**
 * To retrieve onclick seat-id/seat-row/seat-number use "e.target.getAttribute("seat-row")"
 * @param param0 
 * @returns SVG component
 */
const TemplateSVG: React.FC<ITemplateProps> = ({ onSeatClick }) => {
    return(
    <svg width="800" height="500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        {/* Define the movie seat symbol */}
        {/* Dimensions: X=70, Y=49 */}
        <symbol id="movie-seat" viewBox="0 0 800 500">
            {/* Left arm */}
            <rect x="1" y="1" width="14" height="50" fill="gray" stroke="black" rx="4"/>
            {/* Right arm */}
            <rect x="57" y="1" width="14" height="50" fill="gray" stroke="black" rx="4"/>
            {/* Seat cushion */}
            <rect x="17" y="1" width="38" height="35" fill="gray" stroke="black"
            rx="4"/>
            {/* Seat back */}
            <rect x="17" y="37" width="38" height="15" fill="gray" stroke="black"
            rx="4"/>
        </symbol>

        {/* Row one */}
        <use xlinkHref="#movie-seat" x="50" y="50" seat-id="1" seat-row="1" seat-number="1" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="140" y="50" seat-id="2" seat-row="1" seat-number="2" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="230" y="50" seat-id="3" seat-row="1" seat-number="3" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="320" y="50" seat-id="4" seat-row="1" seat-number="4" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="410" y="50" seat-id="5" seat-row="1" seat-number="5" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="500" y="50" seat-id="6" seat-row="1" seat-number="6" onClick={(e) => onSeatClick(e)}/>

        {/* Row two*/}
        <use xlinkHref="#movie-seat" x="25" y="140" seat-id="7" seat-row="2" seat-number="1" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="115" y="140" seat-id="8" seat-row="2" seat-number="2" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="205" y="140" seat-id="9" seat-row="2" seat-number="3" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="295" y="140" seat-id="10" seat-row="2" seat-number="4" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="385" y="140" seat-id="11" seat-row="2" seat-number="5" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="475" y="140" seat-id="12" seat-row="2" seat-number="6" onClick={(e) => onSeatClick(e)}/>

        {/* Row three*/}
        <use xlinkHref="#movie-seat" x="75" y="210" seat-id="13" seat-row="3" seat-number="1" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="165" y="210" seat-id="14" seat-row="3" seat-number="2" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="255" y="210" seat-id="15" seat-row="3" seat-number="3" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="345" y="210" seat-id="16" seat-row="3" seat-number="4" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="435" y="210" seat-id="17" seat-row="3" seat-number="5" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="525" y="210" seat-id="18" seat-row="3" seat-number="6" onClick={(e) => onSeatClick(e)}/>

        {/* Row Four */}
        <use xlinkHref="#movie-seat" x="50" y="300" seat-id="19" seat-row="4" seat-number="1" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="140" y="300" seat-id="20" seat-row="4" seat-number="2" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="230" y="300" seat-id="21" seat-row="4" seat-number="3" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="320" y="300" seat-id="22" seat-row="4" seat-number="4" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="410" y="300" seat-id="23" seat-row="4" seat-number="5" onClick={(e) => onSeatClick(e)}/>
        <use xlinkHref="#movie-seat" x="500" y="300" seat-id="24" seat-row="4" seat-number="6" onClick={(e) => onSeatClick(e)}/>
    </svg>
    )
}

export default TemplateSVG;