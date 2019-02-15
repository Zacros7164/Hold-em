import React from 'react';
import Card from './Card';

function PokerHand(props){
    // console.log(props.cards)
    let hand = props.cards.map((card, i)=>{
        return (
            <Card key={i} card={card} />
        )
    })
    return (
        <div className="col-sm-12">
            {hand}
        </div>
    )
}

export default PokerHand;