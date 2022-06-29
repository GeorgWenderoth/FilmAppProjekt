import React from "react";
import {Stern} from "./sterne";
import gold from './images/stern_gold.svg';
import grau from './images/stern_grau.svg';
import {Link} from "react-router-dom";
import axios from "axios";

export class FilmContainer extends React.Component {
    static STARS = 5;

    constructor(props) {
        super(props);

        this.state = {
            bewertung: this.props.bewertung,
            loading: true,
            vorhandenOderNicht: false
        };
    }

    componentDidMount() {
        console.log("Cookie: " +document.cookie);
        axios({
            method: "get",
            url: 'http://localhost:8080/api/test/user/element' + '?title=' + this.props.nameOrTitle + '&year=' + this.props.erscheinungsJahr,

                headers:{ Authorization: 'Bearer ' +document.cookie}


        }).then(response => {
            console.log(response.data.bewertungsWert);
                this.setState({bewertung: response.data.bewertungsWert})
                this.setState({vorhandenOderNicht: true})
            }
        ).catch(e => "a");
        this.setState({loading: false})
    }

    render = () => {
        if (this.state.loading) {
            return (
                <p>Loading</p>
            )
        }
        return (

            <>
                <div className="film">
                    <Link to={"/detail?id=" + this.props.id + "&movieOrTv=" + this.props.movieOrTv}>
                        <img className="picStyle" alt="bild" src={this.props.imagepath}/>
                        <p className="writingStyle">{this.props.nameOrTitle}</p>
                    </Link>
                    <div className="sterne">
                        {
                            Array.from({length: FilmContainer.STARS}, (v, i) => i + 1)
                                .map(i =>
                                    <Stern id={i}
                                           farbe={this.state.bewertung >= i ? gold : grau} /* if in einer Zeile 1 (gold) true, 2 (grau) false */
                                           click={() => {
                                               if (i === 1 && this.state.bewertung === 1) {
                                                   if (this.state.vorhandenOderNicht === true) {
                                                       axios({
                                                           method: 'put',
                                                           url: 'http://127.0.0.1:8080/api/test/user/element/' + 0,
                                                           headers:{ Authorization: 'Bearer ' +document.cookie},
                                                           data: {
                                                               name: this.props.nameOrTitle,
                                                               erscheinungsJahr: this.props.erscheinungsJahr,
                                                           }
                                                       })
                                                   } else {
                                                       axios({
                                                           method: 'post',
                                                           url: 'http://127.0.0.1:8080/api/test/user/element',
                                                           headers:{ Authorization: 'Bearer ' +document.cookie},
                                                           data: {
                                                               id: 0,
                                                               bewertungsWert: 0,
                                                               exDataId: this.props.id,
                                                               name: this.props.nameOrTitle,
                                                               erscheinungsJahr: this.props.erscheinungsJahr,

                                                           }
                                                       })
                                                       this.setState({bewertung: i, vorhandenOderNicht: true})
                                                   }
                                                   this.setState({bewertung: 0, vorhandenOderNicht: true})

                                               } else {
                                                   if (this.state.vorhandenOderNicht === true) {
                                                       axios({
                                                           method: 'put',
                                                           url: 'http://127.0.0.1:8080/api/test/user/element/' + i,
                                                           headers:{ Authorization: 'Bearer ' +document.cookie},
                                                           data: {
                                                               name: this.props.nameOrTitle,
                                                               erscheinungsJahr: this.props.erscheinungsJahr,
                                                           }
                                                       })
                                                   } else {
                                                       axios({
                                                           method: 'post',
                                                           url: 'http://127.0.0.1:8080/api/test/user/element', headers:{ Authorization: 'Bearer ' +document.cookie},

                                                           data: {
                                                               id: 0,
                                                               bewertungsWert: i,
                                                               exDataId: this.props.id,
                                                               name: this.props.nameOrTitle,
                                                               erscheinungsJahr: this.props.erscheinungsJahr,

                                                           }
                                                       })
                                                   }
                                                   this.setState({bewertung: i, vorhandenOderNicht: true})

                                               }
                                           }}
                                    />
                                )
                        }
                    </div>
                </div>
            </>
        );
    }
}
