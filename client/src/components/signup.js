import React, { Component } from "react";
import cinemaAPI from "../api/cinemaAPI";

export default class SignUp extends Component {
    state = {
        firstName:'',
        lastName:'',
        email:'',
        password:''
    };
   
    // some tests with node.js
    onFormSubmit= async (event)=>{
        event.preventDefault();
        console.log(this.state);
        console.log(this.state.firstName);
        const response = await cinemaAPI.get(`movies/title/${this.state.firstName}`,{
            headers: {},
                   
        })
        console.log(response.data)
    };

    render() {
        return (
            
            <form onSubmit={this.onFormSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" value={this.state.firstName} onChange={e=>this.setState({firstName: e.target.value})} className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" value={this.state.lastName} onChange={e=>this.setState({lastName: e.target.value})} className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={this.state.email} onChange={e=>this.setState({email: e.target.value})} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={e=>this.setState({password: e.target.value})} className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Create your account</button>
                <p className="forgot-password text-right">
                    Already registered <a href="sign-in">log in?</a>
                </p>
            </form>
           
        );
    }
}