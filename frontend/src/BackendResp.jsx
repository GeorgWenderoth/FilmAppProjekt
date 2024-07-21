import axios from "axios";
import {Redirect, Route} from "react-router-dom";
import {test} from "./test";

export async function  BackendResp({component: Component, ...rest}) {
  
    return(
        <Route
            {...rest}
            render={(props) => test() === true
                ? <Component {...props}/>
                : <Redirect to={{pathname: '/login', state: { from: props.location}}}/>}
        />
    )
}


