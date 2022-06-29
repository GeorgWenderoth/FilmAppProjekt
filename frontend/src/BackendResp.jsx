//import Cookies from 'js-cookie';
import axios from "axios";
import {Redirect, Route} from "react-router-dom";
import {test} from "./test";
//import React, { useState } from "react"



export async function  BackendResp({component: Component, ...rest}) {
  //  let [wahr, setWahr] = useState(false);


    return(
        <Route
            {...rest}
            render={(props) => test() === true
                ? <Component {...props}/>
                : <Redirect to={{pathname: '/login', state: { from: props.location}}}/>}
        />
    )

        /*  .then(function (response) {
              console.log(response.data);
             return response.data
          });

   // const dataPromise =  session.then(response => response.data)
   // const data = await dataPromise.then(result )
  /* const b = axios({
        method: "get",
        url: "http://localhost:8080/api/test/user",
        config: {
            headers:{ 'Authorization': "Bearer" +document.cookie}
        }
    }).then(function (response){
        console.log("getSession1: " + response.data);
        return response.data;
    }) */
     //   console.log("getSession: ", a,"C: ", jwt);
       // let b = true;
    //return a.response;
}


