import React, { useState, useEffect } from 'react'
import './GameBoardcss.css'

    const cardBackURL = "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2014/06/card-back-default.png";

export default function CardComp({getCard, val, img}) {

    const [cardDetails, setCardDetails] = useState({ value: val, image: cardBackURL, locked: false});
    


    function showCard() {
        setCardDetails(prev =>{
            return {...prev, image: img}
        })
        console.log(img)
        getCard(cardDetails.value);
    }


    return (
            <button onClick={ /* () => { cardDetails.locked ? 
                null
                :  */
                showCard/* , fromChild(cardDetails.value) }*/}>
                <img className="grid-card" src={`${cardDetails.image}`} />
            </button>
    )
}
