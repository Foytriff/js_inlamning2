import React, { useState, useEffect } from 'react'
import './GameBoardcss.css'

const cardBackURL = "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2014/06/card-back-default.png";

export default function CardComp({addToPair, imgSrc, lock}) {

    function showCard() {
        addToPair(imgSrc);
    }

    return (
            <button onClick={ showCard }>
                <img className="grid-card" src={lock === 0 ? cardBackURL : imgSrc} />
            </button>
    )
}
