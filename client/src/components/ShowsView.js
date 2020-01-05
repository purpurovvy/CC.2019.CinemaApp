import React, { Component } from 'react';
import MovieList from './MovieList'
import Shows from './shows'


class CC extends React.Component {
    state = {
        shows: [],
        mode: true
    }
    fetchShows() {
        const shows = apicall();
        this.setState({ shows });
    }
    render() {
        const shows = this.state.shows;
        return (
            <React.Fragment>
                <DatePicker onChange={this.fetchShows} />
                <ModeSwitch onChange={() => this.setState({ mode: !this.state.mode })} />
                {this.state.mode ? <MovieList shows={shows} /> : <Shows shows={shows} />}
            </React.Fragment>
        )
    }
}