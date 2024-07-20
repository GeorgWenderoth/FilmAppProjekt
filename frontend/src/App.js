import './App.css';
import './Startseite.jsx';
import './Filmseite.jsx';
import './Beliebtseite.jsx';
import './Detailseite.jsx';
import './Sucheseite.jsx';
import {Startseite} from "./Startseite";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Filmseite} from "./Filmseite";
import {Serienseite} from "./Serienseite";
import {Beliebtseite} from "./Beliebtseite";
import React from "react";
import {Navigation} from "./Navigation";
import {Detailseite} from "./Detailseite";
import {Sucheseite} from "./Sucheseite";
import history from "./history";
import {Login} from "./Login";
import axios from "axios";
import {PrivateRoute} from "./privateRoute";
import {BackendResp} from "./BackendResp";
import {CookieJWT} from "./CookieJWT";

const App = () => {


    return (
        <Router history={history}>
            <Navigation/>
            <Switch>
                <Route exact path={"/login"}>
                    <Login/>
                </Route>
                <Route exact path={"/"}>
                    <Startseite/>
                </Route>
                <Route  path={"/filme"}>
                    <Filmseite/>
                </Route>
                <Route path={"/serien"}>
                    <Serienseite/>
                </Route>
                <PrivateRoute path='/beliebt' component={Beliebtseite}/>
      
                <Route path={"/suche"} >
                    <Sucheseite/>
                </Route>
                <Route path={"/detail"}>
                    <Detailseite/>
                </Route>

            </Switch>
        </Router>
    );
}

export default App;
