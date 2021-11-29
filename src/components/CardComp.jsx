import React, { useState, useEffect } from 'react'
import './GameBoardcss.css'

const cardBackURL = "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2014/06/card-back-default.png";

export default function CardComp({getCard, imgSrc}) {

    const [cardDetails, setCardDetails] = useState({ image: cardBackURL});

    function showCard() {
        setCardDetails({image: imgSrc})
        getCard(cardDetails.image);
    }


    return (
            <button onClick={ showCard }>
                <img className="grid-card" src={`${cardDetails.image}`} />
            </button>
    )
}
