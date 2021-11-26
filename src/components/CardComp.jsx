import React, { useState, useEffect } from 'react'
import './GameBoardcss.css'

    const cardBackURL = "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2014/06/card-back-default.png";

export default function CardComp({val, img}) {

    const [props, setProps] = useState({ value: val, image: cardBackURL});
    
    function showCard() {
        setProps(prev =>{
            return {...prev, image: img}
        })
        console.log(img)
    }

    return (
            <button onClick={showCard}><img className="grid-card" src={`${props.image}`} /></button>
    )
}
