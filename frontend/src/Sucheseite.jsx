import axios from "axios";
import React from "react";
import {FilmContainer} from "./FilmContainer";

export class Sucheseite extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            filmContainer: []
        }
    }

   componentDidMount() {
        let filter = new URLSearchParams(window.location.search);
        filter.hasOwnProperty("parameter");
        let suchParameter = filter.get("parameter");
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/search/multi?api_key=f73409a3f2d4b75bd0d49e840b299fc8&language=en-US&query='
                + suchParameter + '&page=1&include_adult=false',
        }).then(response => {
            var results = response.data.results;
            let filmInformationen = [];
            for (var i = 0; i < results.length; i++) {
                const imagepath = "https://image.tmdb.org/t/p/w1280" + results[i].poster_path;
                const name = results[i].original_name;
                const titel = results[i].original_title;
                const bewertung = results[i].vote_average;
                const movieOrTv = results[i].media_type;
                const erscheinungsJahr = results[i].release_date;
                const id = results[i].id;
                const nameOrTitle;
                switch (movieOrTv) {
                    case "tv":
                        nameOrTitle = name;
                        break;
                    case "movie":
                        nameOrTitle = titel;
                        break;
                }
                filmInformationen.push({
                    nameOrTitle,
                    imagepath,
                    bewertung,
                    id,
                    movieOrTv,
                    erscheinungsJahr
                })
            }
            this.setState({filmContainer: filmInformationen});
        });
    }
    
    render = () => {
        return (
            <>
                <div className="containerGrid" id="fid">
                    {this.state.filmContainer.map(props => <FilmContainer {...props}/>)}
                </div>
            </>
        )
    };
}
