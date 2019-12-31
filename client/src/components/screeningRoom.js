import React from 'react';
import Seat from './seats';
import '../screeningRoom.css';

const screeningRoom = props => {
    
    const seats = props.seats.map((seat) => {
        return <Seat key={seat.id}  seat={seat} row={seat.row} num={seat.number}/>
    })
    return (
        <div className="seats-container">{seats}</div>
    )
}

export default screeningRoom