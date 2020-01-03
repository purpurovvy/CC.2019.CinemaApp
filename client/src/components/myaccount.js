import React, { Component } from "react";
import cinemaAPI from "../api/cinemaAPI";

export default class Wallet extends Component {

    state = {
        addmoney:'',
        wallet:''
    };

    onFormSubmit= async (event)=>{
        event.preventDefault();
        console.log(this.state);
     
      
        const response = await cinemaAPI.post(
            'wallet',
            {
                "addmoney": this.state.addmoney,
                "wallet": this.state.wallet,
            },
            {headers: { 'Content-Type': 'application/json' }},
                           
        )
        .then((response)=>{localStorage.setItem('userJWT', response.data)})
        .catch((error) => {
            // Error
            if (error.response) {
                console.log(error.response.data);
            } else {
               console.log(`Something went wrong... ${error.message}`)
               console.log(error.config);
            }
            
        });
        
        
    };

    render() {
        return (

            <div>

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
                        <h4 id="wallet">50 (do pobrania wartość portfela)</h4>
                    </div>
                    <hr></hr>
                    <div className="form-group">
                        <label>Add money to your wallet</label>
                        <input type="number" min="1" value={this.state.addmoney} onChange={e=>this.setState({addmoney: e.target.value})} className="form-control" placeholder="Enter amount" />
                    </div>
                        <button type="submit" className="btn btn-primary btn-block">Add money (dodać do portfela i zaktualizować wartość portfela powyżej)</button>
                    </form>
                </div>
            </div>
            </div>
        );
    }
}