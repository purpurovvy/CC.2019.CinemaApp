import React, {Component} from 'react';
import axios from 'axios';
import Seat from './seats';
import './screeningRoom.css';
//import BuyTicket from './buyTicket'
import {Button} from 'react-bootstrap'





export default class screeningRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            seats: [],
            room: []
        } 
    }


async componentDidMount(){
    this.setState({loading:true});
    
    const { match: { params } } = this.props;
    

    const res = await axios.get(`http://localhost:8080/api/shows/${params.id}/seats`);
    console.log(res)

    this.setState({seats: res.data.seats})

    console.log(this.state.seats)
    
    this.setState({room: res.data.name})
     
    }
    renderSeats()
    {return this.state.seats.map((seat, i) => 
            <Seat key={i} id={seat._id} ticket={seat.ticket} seat={seat}/>
         )
     }
    reserve(){

    }
    render()
    {return (
        <div className="screening-room d-flex flex-column justify-contnt-center align-items-center" style={{marginTop: 20}}>
            <h3 style={{color: 'white'}}>Room: {this.state.room} </h3>
            <div className="screen">screen</div>
            <div className={this.state.room}>{this.renderSeats()}</div>
            <Button variant="success">Buy now</Button> 
            {/* <BuyTicket number={this.state.seats._id} onSubmit={this.onChoose} style={backgroundColor: ''}></BuyTicket> */}

        </div>
    )
}

}

