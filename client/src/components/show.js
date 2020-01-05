import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'


class Show extends React.Component {

  render(){
  const show = this.props;
  console.log(show)

  return (
      <div className="show-container" style={{margin: 30, width: '70vw'}} >
      <div className="d-flex align-items-center">
      <div style={{ marginTop: 10}}>
      <img src={show.show[0].movie.Poster} style={{maxHeight: '40vh'}}></img>
      </div>
      <div style={{marginLeft: 10}}>
      <h5 style={{color:'white' , marginTop: 10}}>{show.show[0].movie.Title}</h5>
      <p style={{color:'#bbb'}}>{show.show[0].movie.Genre}</p>
      <p style={{color:'#ddd'}}>{show.show[0].movie.Plot}</p>
      </div>
      </div>
      <div>
      <div style={{margin: 20, border: 'solid, white, 2px'}}>
      {show.show.map(e => 
      <Link to={`/${e._id}/seats`} style={{margin: 10}}>{new Intl.DateTimeFormat('en-GB', { 
                year:"2-digit",
                month:"2-digit",
                hour: "numeric",
                minute:"numeric" 
            }).format(new Date(e.startDate))}</Link>)}
      </div>
      </div>
  </div>
 
  );
  }
  }

export default Show