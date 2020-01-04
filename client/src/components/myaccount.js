import React, { Component } from "react";
import cinemaAPI from "../api/cinemaAPI";


export default class Wallet extends Component {


    componentDidMount() {
        var JWT = localStorage.getItem('userJWT');
        var jwtDecode = require("jwt-decode");
        var jwt_decoded = jwtDecode(JWT);
        fetch('http://127.0.0.1:8080/api/user/wallet/'+jwt_decoded.email)
        .then(response => response.json())
        .then((data) => {
            document.getElementById('wallet').innerHTML = data[0].wallet.$numberDecimal;
        })
    }
      
     state = {
        addmoney:''
        };

    onFormSubmit= async (event)=>{
        event.preventDefault();

        var JWT = localStorage.getItem('userJWT');
        var jwtDecode = require("jwt-decode");
        var jwt_decoded = jwtDecode(JWT);

        const response = await cinemaAPI.post(
            'user/cashFlow',
            {
                "_id": jwt_decoded._id,
                "role": jwt_decoded.role,
                "email": jwt_decoded.email,
                "iat": jwt_decoded.iat,
                "value": Number(this.state.addmoney)
            },
            {headers: { 'Content-Type': 'application/json' }},
                           
        )
        // .then((response)=>{localStorage.setItem('userJWT', response.data)})
        .catch((error) => {
            // Error
            if (error.response) {
                console.log(error.response.data);
            } else {
               console.log(`Something went wrong... ${error.message}`)
               console.log(error.config);
            }
            
        });

        const response_update = await cinemaAPI.get(
            ('user/Wallet/'+ jwt_decoded.email),
            )
            var wallet_update = response_update.data[0].wallet.$numberDecimal;
            document.getElementById('wallet').innerHTML = wallet_update;
    };

    render() {
        return (

            <div className="mainContent">

            <h3>My Account</h3>
        
            <div className="flex-container">
                <div className="box1">
                  <h4>My Tickets</h4>
                  <div className="tickets">tutaj do pobrania zakupione bilety z bazy</div>
                </div>

                <div className="box2"> 
                    <form onSubmit={this.onFormSubmit}>
                    <h4>My wallet</h4>
                    <div className="form-group">
                        <label>Money in my wallet:</label>
                        <h4 id="wallet">...</h4>
                    </div>
                    <hr></hr>
                    <div className="form-group">
                        <label>Add money to your wallet</label>
                        <input type="number" min="1" value={this.state.addmoney} onChange={e=>this.setState({addmoney: e.target.value})} className="form-control" placeholder="Enter amount" />
                    </div>
                        <button type="submit" className="btn btn-primary btn-block">Add money</button>
                    </form>
                </div>
            </div>
            </div>
        );
    }
}