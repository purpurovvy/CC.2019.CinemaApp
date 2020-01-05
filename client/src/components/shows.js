import React, { Component } from 'react';
import axios from 'axios';
import Show from './shows';
import _ from 'lodash'


export default class ShowsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            shows: [],
        }
    }


    async componentDidMount() {
        this.setState({ loading: true });

        const res = await axios.get('http://localhost:8080/api/shows');
        console.log(res)

        this.setState({ shows: res.data })

        console.log(this.state.shows)
    }

    renderShows() {
        const groupedShow = _.groupBy(this.state.shows, 'movie.Title');
        const showArr = Object.keys(groupedShow).map(i => groupedShow[i])
        return showArr.map((show, i) =>
            <Show key={i} show={show} />
        )
    }
    render() {
        return (
            <div className="shows-list d-flex flex-column" style={{ marginTop: 20 }}>
                <h3 style={{ color: 'white', textAlign: 'center' }}> Now playing </h3>
                <div>{this.renderShows()}</div>
            </div>
        )
    }
}
