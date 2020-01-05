import React, { Component } from 'react';
import MovieList from './MovieList'
import Shows from './shows'
import DatePicker from './DataPicker'
import axios from 'axios';

export default class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
            fireRedirect: false
        }
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ fireRedirect: true })
    }
  

class CC extends React.Component {
    state = {
        shows: [],
        mode: true
    }
    fetchShows() {
        const shows = axios.get('http://localhost:8080/api/shows');
        this.setState({ shows });
    }
    render() {
        const shows = this.state.shows;
        return (
            <React.Fragment>
                <DatePicker onChange={this.fetchShows} />
                <ModeSwitch onChange={() => this.handleSubmit({ mode: !this.state.mode })} />
                {this.state.mode ? <MovieList shows={shows} /> : <Shows shows={shows} />}
            </React.Fragment>
        )
    }
}