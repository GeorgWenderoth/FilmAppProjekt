import React from "react";
import gold from './images/stern_gold.svg';
import grau from './images/stern_grau.svg';

 export class Stern extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img className="picStar" id={this.props.id} onClick={this.props.click} alt="*" src={this.props.farbe} /* src={"./dist/stern_" + this.props.farbe +".svg"} */ />
        )
    }
 }