
export default class Reservation extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      price: 0,
      ticketnumber: 0,
      seats: [],
      reservedSeats: this.getLocalMemory(reservedinit)
    };
    this.getstatus = this.getTicketInfo.bind(this);
  }


  getTicketInfo (addOrDelete, name) {
    if (addOrDelete === 'addTicket') {
      this.setState({
        price: this.state.price + 25,
        numOfTickets: this.state.ticketnumber + 1,
        seats: [...this.state.seats, name]
      });


    } 
    
    else if (addOrDelete === 'deleteTicket') {
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
}
