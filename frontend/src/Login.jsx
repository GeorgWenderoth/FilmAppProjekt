import React from "react";
import axios from "axios";
import history from "./history";
import './styles.scss';
import './login_styles.scss';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            username: "",
            passwort: "",
            message: ""
        }
    }

    handleSubmit = () => {
        console.log("Submit " + this.state.mail + this.state.passwort);
        axios({
            method: "post",
            url: "http://127.0.0.1:8080/api/auth/signin",
            data: {
                username: this.state.username,
                password: this.state.passwort
            }
        }).then(response => {
            if (response) {
                document.cookie = response.data.accessToken;
                history.push({
                    pathname: "/",
                    search: `parameter=${response.data.accessToken}`,
                    state: {value: "this.state.value"}
                });
                window.location.reload(false);
            }
        });
    }

    handleNewAccount = () => {
        axios({
            method: "post",
            url: "http:///localhost:8080/api/auth/signup",
            data: {
                id: 5,
                username: this.state.username,
                email: this.state.mail,
                password: this.state.passwort,
                role: ["mod", "user"]
            }
        }).then(response => {
            this.setState({message: response.data.message});
        })
    }

    handleUsernameChange = (event) =>{
        this.setState({username: event.target.value});
    }

    handleChange = (event) => {
        this.setState({mail: event.target.value}); 
    }

    handlePasswordChange = (event) => {
        this.setState({passwort: event.target.value});
    }

    render() {
        console.log("Mail und P: " + this.state.mail + this.state.passwort);
        return (
            <div className="loginContainer">
                <h1>Login</h1>
                <div className="login">
                    <label className="lable">
                        username
                    </label>
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
                    <label className="lable">
                        Passwort
                    </label>
                    <input type="password" value={this.state.passwort}
                           onChange={this.handlePasswordChange}/>
                    <label className="lable">
                        E-mail
                    </label>
                    <input type="text" value={this.state.mail}
                           onChange={this.handleChange}/>
                    <input type="text" value={this.state.message}/>
                </div>

                <button onClick={this.handleSubmit}>
                    Login
                </button>
                <button onClick={this.handleNewAccount} className="accountButton">
                    Neuen Account erstellen
                </button>
        </div>
        )
    }
}
