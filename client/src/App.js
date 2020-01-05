import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/login";
import Logout from "./components/Logout";
import SignUp from "./components/signup";
import Home from "./components/home";
import MyAccount from "./components/myaccount";
import { withAuthDefault } from "./components/auth";
import { withNavbar } from "./components/Navbar";
import Protected from './components/Protected';
import DatePicker from './components/DatePicker';
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={withNavbar(Home)} />
            <Route path="/sign-in" component={withNavbar(Login)} />
            <Route path="/sign-up" component={withNavbar(SignUp)} />
            <Route path="/my-account" component={withAuthDefault(withNavbar(MyAccount))} />
            <Route path="/protected" component={withAuthDefault(withNavbar(Protected))} />
            <Route path="/sign-out" render={Logout} />
            <Redirect to="/" />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;