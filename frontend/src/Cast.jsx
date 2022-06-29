import React from "react";
import axios from "axios";

export class Cast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            namen: []
        }
    }

    componentDidMount = () => {
        axios({
            method: "get",
            url:
                "https://api.themoviedb.org/3/" + this.props.movieOrTv + "/" +
                this.props.id +
                "/credits?api_key=f73409a3f2d4b75bd0d49e840b299fc8",
        }).then(response => {
            let castnamen = [];
            response.data.cast.forEach(a => castnamen.push(a.name))
            this.setState({namen: castnamen});
        })
    }

    render = () => {
        return (
            <div>
                <p className="text">Cast</p>
                <ul>
                    {this.state.namen.map(name => <li>{name}</li>)}
                </ul>
            </div>
        )
    }
}