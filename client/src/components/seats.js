import React, {Component} from 'react';
import './seat.css'



class Seat extends Component {
 constructor (props){
     super(props);
     this.state ={
         bgc: this.props.ticket ? 'red' : 'grey',
         seatId: ''
         
     };
    
 }
 reserve = () => {
     if(!this.props.ticket) {
         this.state.bgc === 'grey' ? this.setState({bgc: 'green'}) : this.setState({bgc: 'grey'})
     }
     this.props.onClick(this.props.id)
 }

render()
{return (
        <div>
            <input className="seat" style={{backgroundColor: this.state.bgc}} onClick={this.reserve}></input>
        </div>
    )
}
}
export default Seat