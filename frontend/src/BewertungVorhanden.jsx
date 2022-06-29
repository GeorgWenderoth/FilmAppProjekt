import axios from "axios";
import React from "react";
import {FilmContainer} from "./FilmContainer";
// Not in Use right now
class BewertungVorhanden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            bewertung: this.props.bewertung,
            vorhandenOderNicht: false

        }
    }

    componentDidMount = () => {
        axios({
            method: "get",
            url: 'http://127.0.0.1:8080/element' + "?title=" + this.props.nameOrTitle + "&year=" + this.props.erscheinungsJahr

        }).then(response => {
                if (response.data !== "Das gesuchte Element wurde nicht gefunden") {

                    this.setState({bewertung: response.data.bewertungsWert})
                    this.setState({vorhandenOdernicht: true})
                }
            }
        ).catch(e => "a" )
    }

    render = () => {
        console.log("State: " + this.state.bewertung);
        console.log(this.props.nameOrTitle + " VORHANDEN Render BV: " + this.state.vorhandenOderNicht)
        return (
            <>
                {<FilmContainer nameOrTitle={this.props.nameOrTitle}
                                imagepath={this.props.imagepath}
                                bewertung={this.state.bewertung}
                                id={this.props.id}
                                movieOrTv={this.props.movieOrTv}
                                erscheinungsJahr={this.props.erscheinungsJahr}
                                vorhandenOderNicht={this.state.vorhandenOderNicht}/>}

            </>
        )
    };

}