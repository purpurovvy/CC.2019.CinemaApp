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
            console.log(data);
        })
        // fetch('http://127.0.0.1:8080/api/ticket/my/'+jwt_decoded.email)
        // .then(response => response.json())
        // .then((json_ticket) => {
       // })


        var json_ticket = [
        
            {   "screeningRoom" : "A",
            "seat" : ["II , 3"],
            "movieTitle" : "Star Wars: Episode IV - A New Hope",
            "price" : {"$numberDecimal":"15"},
            "startDate" : "2019-12-23T15:30:00.000Z" },

            {   "screeningRoom" : "B",
            "seat" : ["III , 4"],
            "movieTitle" : "Baranek Shaun - Farmagedon",
            "price" : {"$numberDecimal":"10"},
            "startDate" : "2019-12-29T13:30:00.000Z" },

            {   "screeningRoom" : "A",
            "seat" : ["IX , 10"],
            "movieTitle" : "James Bond - GoldenEye",
            "price" : {"$numberDecimal":"20"},
            "startDate" : "2019-12-31T18:30:00.000Z" },

            {   "screeningRoom" : "B",
            "seat" : ["I , 12"],
            "movieTitle" : "Psy 3 - w imię zasad",
            "price" : {"$numberDecimal":"30"},
            "startDate" : "2020-01-05T19:30:00.000Z" },

            // {   "screeningRoom" : "A",
            // "seat" : ["VI , 18"],
            // "movieTitle" : "JUDY",
            // "price" : {"$numberDecimal":"20"},
            // "startDate" : "2020-01-08T13:30:00.000Z" },

            // {   "screeningRoom" : "C",
            // "seat" : ["VI , 18"],
            // "movieTitle" : "Pies wie jaki jest",
            // "price" : {"$numberDecimal":"20"},
            // "startDate" : "2020-01-08T13:30:00.000Z" },

        ];

        tickets(json_ticket);


        function tickets(json_ticket) {
            for (var value=0; value<json_ticket.length; value++) {
                document.getElementById(`ticket_${value}`).innerHTML = 
                `<div class="ticket-title">Ticket ${value+1}</div>
                <div class="span-title"><span id="title${value}" class="span-title"></span></div>
                <div class="ticket-name">Room: <span id="room${value}" class="span-data"></span> , Row and Place: <span id="seat${value}" class="span-data"></span></div>
                <div class="ticket-name">Date: <span id="date${value}" class="span-data"></span></div>
                <div class="ticket-name">Price: <span id="price${value}" class="span-data"></span></div>`;

                document.getElementById(`room${value}`).innerHTML = json_ticket[value].screeningRoom;
                document.getElementById(`seat${value}`).innerHTML = json_ticket[value].seat[0];
                document.getElementById(`title${value}`).innerHTML = json_ticket[value].movieTitle;
                document.getElementById(`price${value}`).innerHTML = json_ticket[value].price.$numberDecimal;
                document.getElementById(`date${value}`).innerHTML = json_ticket[value].startDate.slice(0,10)+" "+json_ticket[0].startDate.slice(11,16);
            }
        }

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

            <div className="title-head">My Account</div>

            <div className="flex-container">
                <div className="box1" id="tickets_box">
                  <h4>My Tickets</h4>
                    <div className="tickets" id="ticket_0"></div>
                    <div className="tickets" id="ticket_1"></div>
                    <div className="tickets" id="ticket_2"></div>
                    <div className="tickets" id="ticket_3"></div>
                    <div className="tickets" id="ticket_4"></div>
                    <div className="tickets" id="ticket_5"></div>
                    <div className="tickets" id="ticket_6"></div>
                    <div className="tickets" id="ticket_7"></div>
                    <div className="tickets" id="ticket_8"></div>
                    <div className="tickets" id="ticket_9"></div>
                    <div className="tickets" id="ticket_10"></div>
                    <div className="tickets" id="ticket_11"></div>
                    <div className="tickets" id="ticket_12"></div>
                    <div className="tickets" id="ticket_13"></div>
                    <div className="tickets" id="ticket_14"></div>
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