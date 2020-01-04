import React, { Component } from "react";
import "../App.css";

import MovieList from "./MovieList";

export default class Home extends Component {
    render() {
        return (
         <div className="mainContent"> 
               <MovieList/>
         </div>
        );
    }
}