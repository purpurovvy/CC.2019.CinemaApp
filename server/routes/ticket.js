const Joi = require('joi');
const {Ticket} = require('../db/models/ticket');
const express = require('express');
const router = express.Router();

class UserTickets{
    constructor(screeningRoom, seat, movieTitle, price, startDate){
        this.screeningRoom = screeningRoom;
        this.seat = seat;
        this.movieTitle = movieTitle;
        this.price = price;
        this.startDate = startDate;
    }
}

router.get('/my/:email', async (req, res) => {
    let ticketsResult = [];
   
    //get tickets with all references
    async function getListOfTickets(){
        const tickets = await Ticket.find().populate({path:'user show', populate:{path:'movie', select:'Title -_id'}});
        let res = tickets.filter(function(item){return item.user.email == req.params.email});
        return res;
    }

        //modifications
    async function ticketTrim(ticketsWithReferences) 
       
     { 
        ticketsWithReferences.forEach(item => {
            let ticketId = item._id;
            let seat = [];
                    item.show.screeningRoom.seats.forEach(element => {
                    if(element.ticket != null){
                        let notNullTicket = element.ticket.toString(); 
                        if(notNullTicket == ticketId){seat.push(element._id)};
                        }
                    });          
            ticketsResult.push(new UserTickets(item.show.screeningRoom.name,seat,item.show.movie.Title,item.show.price,item.show.startDate))
          
        });
        return ticketsResult;
               
    }
    
  const  ticketsWithReferences = await getListOfTickets();
  const  result = await ticketTrim(ticketsWithReferences)

    res.send(result);
     
})



  module.exports = router;
