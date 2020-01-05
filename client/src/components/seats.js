import React, {Component} from 'react';
import './seat.css'



class Seat extends Component {
 constructor (props){
     super(props);
     this.state ={
         bgc: this.props.ticket ? 'red' : 'grey',
         seatId: ''
         
     };
     console.log(this.props)
 }
 reserve = () => {
     if(!this.props.ticket) {
         this.state.bgc === 'grey' ? this.setState({bgc: 'green'}) : this.setState({bgc: 'white'})
     }
     this.setState({seatId: this.props.id})
     console.log (this.props.id)
 }

render()
{return (
        <div>
            <input className="seat" style={{backgroundColor: this.state.bgc}} onClick={this.reserve} value={this.state.seatId}></input>
        </div>
    )
}
}
export default Seat