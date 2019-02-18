import React, {Component} from 'react';
import Deck from '../utilityClasses/Deck';
import GameButtons from "./GameButtons";
import PokerHand from "./PokerHand";

// eslint-disable-next-line
class PokerTable extends Component{
    constructor(){
        super()
        this.cards= new Deck();
        this.cards.createDeck();
        this.cards.shuffleDeck();
        this.state= {
            playersHand: ['blue_back', 'blue_back'],
            dealersHand: ['blue_back', 'blue_back'],
            communityCards: ['blue_back','blue_back','blue_back','blue_back','blue_back',],
            wager: 0,
            bankroll: 1000,
        }
        this.prepDeck = this.prepDeck.bind(this);
        this.playerBet= this.playerBet.bind(this);
    }

    // this is a custom METHODS. not coming from react
    // we can't put this in our deck class, because it is specific to our hold em game
    prepDeck(){
        this.cards.createDeck();
        this.cards.shuffleDeck();
        this.cards.deck.shift(); //burn card
        const card1 = this.cards.deck.shift();
        const card2 = this.cards.deck.shift();
        const card3 = this.cards.deck.shift();
        const card4 = this.cards.deck.shift();
        // deck is now only 48 because we mutated this.deck when we ran shift
        
        this.setState({
            playersHand: [ card1, card3 ],
            dealersHand: [ card2, card4 ],

        })

    }

    // this method will be sent to game buttons and will be used to update the player bet
    // after they bet, we will call draw method (will create later)
    playerBet(amount){
        const newWager = this.state.wager + amount
        const newBankroll = this.state.bankroll - amount
        this.setState({
            wager: newWager + amount,
            bankroll: newBankroll
        })

        this.draw();
    }

    // draw is called whenever the community needs new cards
    draw(){
        // we have to use Object.assign( or ...) to make a separate copy of state
        // let communityNewHand = this.state.communityCards will contain 
        // a pointer to communityCards not the actual data

        // ------Older ES2 way------
        // let communityNewHand = Object.assign([], this.state.communityCards)

        // ------Newer ES6 way------
        let communityNewHand = [...this.state.communityCards]
        if(communityNewHand[0]==='blue_back'){
            communityNewHand = [this.cards.deck.shift(),this.cards.deck.shift(),this.cards.deck.shift()]
        }else if(communityNewHand.length < 5){
            console.log(communityNewHand)
            communityNewHand.push(this.cards.deck.shift());
            // communityNewHand = [...communityNewHand, this.cards.deck.shift()]
        }
        
        this.setState({
            communityCards: communityNewHand
        })
        console.log(communityNewHand)

    }

    render(){
        return(
            <div className="col-sm-12 the-table">
                <div className="col-sm-12 text-center">
                    <p>Current Wager ${this.state.wager}</p>
                    <p>Current Bankroll ${this.state.bankroll}</p>
                </div>
                <PokerHand cards={this.state.dealersHand} />
                <PokerHand cards={this.state.communityCards} />
                <PokerHand cards={this.state.playersHand} />
                <GameButtons dealFunction={this.prepDeck} betFunction={this.playerBet} draw={this.draw}/>         
            </div>
        )
    }
}

export default PokerTable;