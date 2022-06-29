import React from 'react';
import axios from "axios";
import "./DetailFilmContainer";
import {DetailFilmContainer} from "./DetailFilmContainer";

export class Detailseite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {
        var searchParams = new URLSearchParams(window.location.search);
        searchParams.has("id");
        var id = searchParams.get("id");
        var searchType = new URLSearchParams(window.location.search);
        searchType.has("movieOrTv");
        var movieOrTv = searchType.get("movieOrTv");

        axios({
            method: "get",
            url: "https://api.themoviedb.org/3/" +
                movieOrTv +
                "/" +
                id +
                "?api_key=f73409a3f2d4b75bd0d49e840b299fc8&language=en-US",
        }).then(response => {
                var imagepath = "https://image.tmdb.org/t/p/w1280" + response.data.poster_path;
                var name = response.data.original_name;
                var titel = response.data.original_title;
                var bewertung = response.data.vote_average;
                var overview = response.data.overview;
                var runtime = response.data.runtime;
                var nameOrTitle;
                switch (movieOrTv) {
                    case "tv":
                        nameOrTitle = name;
                        break;
                    case "movie":
                        nameOrTitle = titel;
                        break;
                }
                this.setState({imagepath, nameOrTitle, bewertung, overview, runtime, movieOrTv, id});
            }
        )
    }

    render = () => { // Ist das mit den Serch params nicht unsauber?
        return (

            <>
                <div className="detailsContainer" id="fid">
                    <DetailFilmContainer {...this.state} movieOrTv={new URLSearchParams
                    (window.location.search)
                        .get("movieOrTv")} id={new URLSearchParams
                    (window.location.search)
                        .get("id")}/>
                </div>
            </>
        );
    }
}