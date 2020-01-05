const { User, UserRole } = require('./models/user');
const { Movie } = require('./models/movie');
const { ScreeningRoom } = require('./models/screening-room');
const { Show } = require('./models/show');
const { Ticket, TicketStatus, TicketType } = require('./models/ticket');

module.exports = async () => {
  if (!(await User.countDocuments())) {
    const usersData = [
      {
        _id : "5e0a2629aaf09c37482d86a3",
        email: 'user@gmail.com',
        password: 'hash-me',
        firstName: 'fName',
        lastName: 'lName',
        role: UserRole.USER,
        wallet: 120.12,
      },
      {
        _id: "5e0a2629aaf09c37482d86a4",
        email: 'admin@gmail.com',
        password: 'hash-me',
        firstName: 'fName',
        lastName: 'lName',
        role: UserRole.ADMIN,
      },
    ];
    const [user, admin] = await User.insertMany(usersData);

    const sw = JSON.parse(
      `{"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","Rated":"PG","Released":"25 May 1977","Runtime":"121 min","Genre":"Action, Adventure, Fantasy, Sci-Fi","Director":"George Lucas","Writer":"George Lucas","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing","Plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.","Language":"English","Country":"USA","Awards":"Won 6 Oscars. Another 50 wins & 28 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.6/10"},{"Source":"Rotten Tomatoes","Value":"93%"},{"Source":"Metacritic","Value":"90/100"}],"Metascore":"90","imdbRating":"8.6","imdbVotes":"1,150,440","imdbID":"tt0076759","Type":"movie","DVD":"21 Sep 2004","BoxOffice":"N/A","Production":"20th Century Fox","Website":"N/A","Response":"True"}`,
    );
    const movie = await new Movie(sw).save();

    const createSeats = (rows, numOfColumns) =>
      [].concat(
        ...Array.from(rows, x =>
          Array.from(Array(numOfColumns), (_, i) => {
            return { row: x, number: i + 1 };
          }),
        ),
      );

    const screeningRoomData = [
      {
        name: 'A',
        seats: createSeats(['I', 'II', 'III', 'IV', 'V'], 10),
      },
      {
        name: 'B',
        seats: createSeats(['I', 'II', 'III'], 8),
      },
    ];
    const [sRoomA, sRoomB] = await ScreeningRoom.insertMany(screeningRoomData);

    const sRoomToShowsSRoom = sr => {
      return {
        name: sr.name,
        seats: sr.seats.map(x => {
          return {
            code: x.seat_code,
            ticket: null,
          };
        }),
      };
    };

    const showsData = [
      {
        startDate: new Date('2019-12-23T15:30:00+0000'),
        endDate: new Date('2019-12-23T17:30:00+0000'),
        movie: movie,
        price: 15.0,
        screeningRoom: sRoomToShowsSRoom(sRoomA),
      },
      {
        startDate: new Date('2019-12-23T18:00:00+0000'),
        endDate: new Date('2019-12-23T20:00:00+0000'),
        movie: movie,
        price: 15.0,
        screeningRoom: sRoomToShowsSRoom(sRoomA),
      },
      {
        startDate: new Date('2019-12-23T16:30:00+0000'),
        endDate: new Date('2019-12-23T18:30:00+0000'),
        movie: movie,
        price: 15.0,
        screeningRoom: sRoomToShowsSRoom(sRoomB),
      },
    ];

    const [show1, show2, show3] = await Show.insertMany(showsData);

    const ticketData = {
      user: user,
      show: show1,
      type: TicketType.RESERVATION,
      price: 15.0,
    };

    const ticket = await new Ticket(ticketData).save();
    show1.screeningRoom.seats[12].ticket = ticket;
    await show1.save();
  }
};
