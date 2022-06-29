import {Redirect, Route} from "react-router-dom";
import axios from "axios";


export function test(res){

    const jwt = document.cookie;//Cookies.get('__session');
    try{
        const res =  axios.get("http://localhost:8080/api/test/user", {headers:{ Authorization: 'Bearer ' + jwt}})
       return
    }catch (err) {
        console.log(err);
    }

}