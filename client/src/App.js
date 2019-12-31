import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import screeningRoom from './components/screeningRoom';
import Shows from './components/shows';
import screeningRoom from './components/screeningRoom';


class App extends React.Component {
  render(){
    return(
      <Router>
       
        <Route exact path="/shows/:id/seats" component={screeningRoom} />
        <Route exact path="/shows" component={Shows}/>
       
      </Router>
    );
  }
}

export default App;
