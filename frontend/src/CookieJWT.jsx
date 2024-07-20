import React from "react";
import axios from "axios";

export  class CookieJWT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backendResponse: false,
        }
        this.call();
    }

    call (){
        axios.get("http://localhost:8080/api/test/user", {headers:{ Authorization: "Bearer" + document.cookie}})
            .then(response => {
                console.log("backend: ", response.data);
                this.setState({backendResponse: response.data})
            });
    }

    render() {
        return(
            this.state.backendResponse
        )
    }
}
