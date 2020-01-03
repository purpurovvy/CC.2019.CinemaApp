import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Router, Switch, Route, Link, } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home";
<<<<<<< HEAD
import { withAuth } from "./components/auth";
import Protected from './components/Protected'
const ProtectedWithAuth = withAuth(Protected, '/sign-in');
=======
import MyAccount from "./components/myaccount";
>>>>>>> myaccount page

class App extends React.Component {

<<<<<<< HEAD
  render() {
    return (

      <BrowserRouter>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/"}>CodersCamp Cinema</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/protected"}>Protected</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="cinemaContainer">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/protected" component={ProtectedWithAuth} />
            </Switch>
          </div>
=======
render() {
  return (
    
    <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>CodersCamp Cinema</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/my-account"}>My account</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    <div className="cinemaContainer">
    
      <div className="mainContent"><Route exact path='/' component={Home} /></div>
      <div className="authPanel"><Route path="/sign-in" component={Login} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/my-account" component={MyAccount} /> </div>     
     
    </div>
>>>>>>> myaccount page

        </div>
      </BrowserRouter>
    );
  }
}
export default App;