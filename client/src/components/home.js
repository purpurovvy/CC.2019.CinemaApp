import React, { Component } from "react";
import "../App.css";
import MovieList from "./MovieList";
import DatePicker from "./DatePicker";




export default class Home extends Component {
    render() {
        return (
            <div className="mainContent">
                <DatePicker />
                <MovieList />
            </div>
        );
    }
}