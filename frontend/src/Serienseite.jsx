import React from "react";
import axios from "axios";
import './FilmContainer.jsx';
import { FilmContainer } from "./FilmContainer";
import './styles.scss';
import { BewertungVorhanden } from "./BewertungVorhanden";

export class Serienseite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmContainer: []
        };
    }

    componentDidMount = () => {
        axios({
            method: "get",
            url: 'https://api.themoviedb.org/3/tv/popular?api_key=f73409a3f2d4b75bd0d49e840b299fc8&language=en-US&page=1',
        }).then(response => {
            let filmInformationen = [];
            const results = response.data.results;
            for (let i = 0; i < results.length; i++) {
                const imagepath = "https://image.tmdb.org/t/p/w1280" + results[i].poster_path;
                const ungeteilteBewertung = results[i].vote_average;
                const bewertung = Math.round(ungeteilteBewertung / 2);
                const movieOrTv = "tv";
                const nameOrTitle = results[i].original_name;
                const erscheinungsJahr = results[i].first_air_date;
                const id = results[i].id;

                filmInformationen.push({
                    nameOrTitle,
                    imagepath,
                    bewertung,
                    id,
                    movieOrTv,
                    erscheinungsJahr
                });
            }
            this.setState({
                filmContainer: filmInformationen
            });
        });
    }

    render = () => {
        return (
            <>
                <div className="containerGrid" id="fid">
                    {this.state.filmContainer.map(props => <FilmContainer key={props.id} {...props} />)}
                </div>
            </>
        );
    };
}
