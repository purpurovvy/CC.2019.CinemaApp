import React, {Component, Fragment} from 'react';

import api from '../api/cinemaAPI';

export default class MovieList  extends Component {
    constructor(props){
        super(props);
        this.state = {movies: []};
    }


    componentDidMount(prevProps, rpevState) {
        api.get('/movies').then(response=> {
            this.setState({
                movies: response.data
            })
        });
    }

    renderMovieItem(movie){
        return <li key={movie.id}>
            <div>{movie.Title}</div>
            <img src={movie.Poster} style={{width: '200px'}}/>
        </li>
    }

    render(){
        if(this.state.movies && this.state.movies.length > 0){
            const listOfMovies = this.state.movies.map((movie) => this.renderMovieItem(movie));

            return <ul>{listOfMovies}</ul>;
        }
        else {
            return null;
        }
    }
}