import {BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {backendResp} from "./BackendResp";
import {test} from "./test";
import axios from "axios";
import {useEffect, useState} from "react";


export function PrivateRoute ({component: Component, ...rest}) {
    const jwt = document.cookie;
    const [data, updateData] = useState(false);
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
        const getData = async () => {
            const resp = await axios.get('http://localhost:8080/api/test/user',{
                headers: {Authorization: `Bearer ${jwt}`}
            });
            const json = await resp.data;
            updateData(json);
            setLoading(false);
        }
        getData();
    }, []);

    if(isLoading) {
        return  <div>Loading ...</div>
    }

        return (
            <Route
                {...rest}
                render={(props) => data === true
                    ? <Component {...props}/>
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
            />
        )
}
