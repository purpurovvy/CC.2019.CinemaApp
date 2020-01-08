import React, {Component} from 'react';
import axios from 'axios';
import Seat from './seats';
import {Button} from 'react-bootstrap'
import './screeningRoom.css';






export default class screeningRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            seats: [],
            room: [],
            clicked: []
            
        } 
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this) 
    }


async componentDidMount(){
    this.setState({loading:true});
    
    const { match: { params } } = this.props;
    

    const res = await axios.get(`http://localhost:8080/api/shows/${params.id}/seats`);
    //console.log(res)

    this.setState({seats: res.data.seats})
    //console.log(this.state.seats)
    this.setState({room: res.data.name});
    
     
    }
    renderSeats()
    {return this.state.seats.map((seat) => 
            <Seat id={seat._id} onClick={this.handleClick} key={seat._id} value={seat._id} ticket={seat.ticket} seat={seat}/>
         )
     }
    
    async handleSubmit(e){
        console.log(this.state.clicked)
        const { match: { params } } = this.props;
        const JWT = localStorage.getItem('userJWT');

        if (!JWT) {
            console.log("no jwt")
            alert('Please sign in order to make reservation')
        }
        
        try{
        const res = await axios.post(`http://localhost:8080/api/ticket`,
       
            {
                "show" : `${params.id}`,
                "seatId": this.state.clicked
            },
            { headers: { 'Content-Type': 'application/json', 'x-auth-token': `${JWT}`} }
        )
            console.log(res)

        }catch(err) {
                console.log(err)
                }               
        
            e.preventDefault();
    };

        
  
 
    handleClick(id){
        this.setState(prevState => ({clicked: [...prevState.clicked, id]}))
    }
   
    
    render()
    {return (
        <div className="screening-room d-flex flex-column justify-contnt-center align-items-center" style={{marginTop: 20}}>
            <h3 style={{color: 'white'}}>Room: {this.state.room} </h3>
            <div className="screen">screen</div>
            <form onSubmit={this.handleSubmit.bind(this)} className="d-flex flex-column align-items-center">
            <div className={this.state.room} >{this.renderSeats()}</div>
            <Button className="mb-3" variant="primary" type="submit">Rezerwuję</Button>
            </form>
        </div>
    )
}

}

