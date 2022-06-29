import React from 'react';
import "./Cast.jsx";
import {Cast} from "./Cast";

export class DetailFilmContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="film">
                <img src={this.props.imagepath} alt="bild" className="picStyle"/>
                <div className="text">
                    <p>{this.props.nameOrTitle}</p>
                    <p>{this.props.overview}</p>
                    <p>{"Länge: " + this.props.runtime + " min"}</p>
                </div>
                <div className="details">
                    <Cast id={this.props.id} movieOrTv={this.props.movieOrTv}/>
                </div>
            </div>
        );
    }
}