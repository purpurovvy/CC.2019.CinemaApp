import React, {Component} from 'react';
import './seat.css'



class Seat extends Component {
 constructor (props){
     super(props);
     this.state ={
         bgc: this.props.ticket ? 'red' : 'grey'
     };
 }
 reserve = () => {
     if(!this.props.ticket) {
         this.state.bgc === 'grey' ? this.setState({bgc: 'green'}) : this.setState({bgc: 'white'})
     }

 }


render()
{return (
        <div>
            <div className="seat" style={{backgroundColor: this.state.bgc}} onClick={this.reserve}></div>
        </div>
    )
}
}
export default Seat