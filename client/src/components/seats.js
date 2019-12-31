import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Grid } from 'semantic-ui-react'


const bcg = '';


export default class Seat extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            seats: []
        }
        //this.seatRef = React.createRef()
    }
    async componentDidMount(){
        this.setState({loading:true});

        const res = await axios.get('http://localhost:8080/shows/:id/seats');

        this.setState({seats: res.data})

        const isAvailable = await res.data.ticket;

        
        if (isAvailable === null) {
           bcg = '#aaa'
        } else {
            bcg = '#FF0000'
        }

  
    }
    render(){
        return (
            <div>
            <div className="seat" style={{backgroundColor: bcg}} />
            </div>
        )
    }
}