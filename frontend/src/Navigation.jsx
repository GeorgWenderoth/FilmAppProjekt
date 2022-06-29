import './styles.scss';
import './details_styles.css'
import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import history from "./history";

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            toggle: true,
            active: ""
        }
    }

    handleChange = (event) => {
        this.setState({value: event.target.value})
    }

    handleSubmit = (event) => {
        if (event.key === "Enter") {
            history.push({
                pathname: "suche",
                search: `parameter=${this.state.value}`,
                state: {value: "this.state.value"}
            });
            window.location.reload(false);
        }
    }

    handleButton = (event) => {
        if (this.state.toggle) {
            this.setState({active: " buttonActive", toggle: false});
        } else {
            this.setState({active: "", toggle: true});
        }
    }

    render = () => {
        return (

            <header className={"header"}>
                <button className="menuButton" onClick={this.handleButton}>
                    Navbar
                </button>
                <div className={"linksUndsucheContainer" + this.state.active}>
                    <div className="links">
                        <NavLink exact to={"/"} className={"link"}
                                 activeClassName={"markierterLink"}>Startseite</NavLink>
                        <NavLink to={"/serien"} className={"link"} activeClassName={"markierterLink"}>Serien</NavLink>
                        <NavLink to={"/filme"} className={"link"} activeClassName={"markierterLink"}>Filme</NavLink>
                        <NavLink to={"/beliebt"} className={"link"} activeClassName={"markierterLink"}>Beliebt</NavLink>
                    </div>
                    <div className="sucheContainer">
                        <input
                            id="sucheInput"
                            onKeyUp={this.handleSubmit}
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="suche"
                            type="text"
                            name="suche"
                            placeholder="Suche"
                        />
                    </div>
                </div>
            </header>
        );
    }

}




