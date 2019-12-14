if (addOrDelete === 'deleteTicket') {
  this.setState({
    price: this.state.price - 25,
    numOfTickets: this.state.ticketnumber - 1,
  });        seats: this.deleteTicket(this.state.seats, name)

}
}


deleteTicket (x, name) {
let arr = x;
let index = arr.indexOf(name);
if (index > -1) {
  arr.splice(index, 1);
}
return arr;
}