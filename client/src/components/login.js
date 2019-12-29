import React, { Component } from "react";


export default class Login extends Component {

    state = {
        email:'',
        password:''
    };

    onFormSubmit=(event)=>{
        event.preventDefault();
        console.log(this.state);
    };

    render() {
        return (
            <div>
            <form onSubmit={this.onFormSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={this.state.email} onChange={e=>this.setState({email: e.target.value})} className="form-control" placeholder="Enter email"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={e=>this.setState({password: e.target.value})} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign-in</button>
                <p className="forgot-password text-right">Don&apos;t have an account? <a href="/sign-up">Create one</a>.</p>

            </form>
         </div>
        );
    }
}