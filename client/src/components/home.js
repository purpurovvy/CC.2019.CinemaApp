import React, { Component } from "react";
import "../App.css";

import MovieList from "./MovieList";

export default class Home extends Component {
    render() {
        return (
        <div className="mainContent"> 
            <form action="/">
                <h5>Data seansu: </h5>
                <input type="date" name="movieday"/>
                <input type="submit" value="Szukaj!"/>  
            </form>        
               <MovieList/>
         </div>
        );
    }
}