import React, {Component} from 'react';


// eslint-disable-next-line
class GameButtons extends Component{
    constructor(){
        super()
        this.state = {}
    }
    

    render(){
		return(
			<div className="col-sm-12 buttons text-center">
				<div className="col-sm-2 text-center">
					<button onClick={this.props.dealFunction} className="btn btn-danger">Deal</button>
				</div>
				<div className="col-sm-2 text-center">
					<button onClick={()=>{this.props.betFunction(10)}}
						className="btn btn-warning">Bet 10</button>
				</div>				
				<div className="col-sm-2 text-center">
					<button onClick={()=>{this.props.betFunction(100)}}
						className="btn btn-warning">Bet 100</button>
				</div>
			</div>
		)
	}
}

export default GameButtons;