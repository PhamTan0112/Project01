const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const Guest = require("../models/Guest");
const _ = require("lodash");

exports.bookingById = async (req, res, next, id) => {
  const booking = await Booking.findById(id).populate("Flight owner guest user");

  if (!booking) {
    return res.status(400).json({
      error: "Booking not found"
    });
  }
  req.booking = booking; // adds booking object in req with booking info
  next();
};

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find({}).populate("Flight owner guest user self");

  res.json(bookings);
};

exports.getOwnerBookings = async (req, res) => {
  const bookings = await Booking.find({ owner: req.ownerauth }).populate(
    "Flight owner guest user self"
  );

  res.json(bookings);
};

exports.postBooking = async (req, res) => {
  const booking = new Booking(req.body);
  if (req.userauth) {
    booking.user = req.userauth;
  } else {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    let user = await Guest.findOne({ phone });

    if (user) {
      user = _.extend(user, req.body);
      await user.save();
      booking.guest = user;
    } else {
      const guest = new Guest({ name, email, phone, address });
      await guest.save();
      booking.guest = guest;
    }
  }

  const flight = await Flight.findOne({ slug: req.flight.slug });

  if (
    flight.seatsAvailable < (req.body.passengers || booking.passengers) ||
    flight.isAvailable !== true ||
    flight.soldSeat.includes(booking.seatNumber) ||
    flight.bookedSeat.includes(booking.seatNumber)
  ) {
    return res.status(400).json({
      error: "Not available"
    });
  }

  flight.seatsAvailable -= req.body.passengers || booking.passengers;

  flight.bookedSeat.push(booking.seatNumber);

  booking.flight = flight;
  booking.owner = flight.owner;

  await booking.save();
  await flight.save();

  res.json(booking);
};

exports.postSold = async (req, res) => {
  const booking = new Booking(req.body);
  booking.self = req.ownerauth;

  const flight = await flight.findOne({ slug: req.flight.slug });

  if (
    flight.seatsAvailable < booking.passengers ||
    flight.isAvailable !== true ||
    flight.soldSeat.includes(booking.seatNumber) ||
    flight.bookedSeat.includes(booking.seatNumber)
  ) {
    return res.status(400).json({
      error: "Not available"
    });
  }

  flight.seatsAvailable -= booking.passengers;

  flight.soldSeat.push(booking.seatNumber);

  booking.flight = flight;
  booking.owner = flight.owner;
  booking.verification = "payed";

  await booking.save();
  await flight.save();

  res.json(booking);
};

exports.changeVerificationStatus = async (req, res) => {
  const booking = req.booking;

  booking.verification = req.body.verification;

  await booking.save();

  res.json(booking);
};

exports.deleteBooking = async (req, res) => {
  const booking = req.booking;

  const flight = await Flight.findOne({ slug: booking.flight.slug });

  if (booking.verification === "payed") {
    const removeIndexSold = flight.soldSeat
      .map(seat => seat.toString())
      .indexOf(booking.seatNumber);

    flight.soldSeat.splice(removeIndexSold, 1);
  } else {
    const removeIndexBook = flight.bookedSeat
      .map(seat => seat.toString())
      .indexOf(booking.seatNumber);

    flight.bookedSeat.splice(removeIndexBook, 1);
  }

  await booking.remove();
  await flight.save();

  res.json(booking);
};
