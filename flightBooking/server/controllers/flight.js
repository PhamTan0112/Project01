const Flight = require("../models/Flight");
const _ = require("lodash");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { checkDateAvailability } = require("../helpers");

exports.flightBySlug = async (req, res, next, slug) => {
  const flight = await Flight.findOne({ slug }).populate("owner", "name role");
  if (!flight) {
    return res.status(400).json({
      error: "Flight not found"
    });
  }
  req.flight = flight; // adds flight object in req with flight info
  next();
};

exports.read = (req, res) => {
  return res.json(req.flight);
};

exports.getFlightes = async (req, res) => {
  const flightes = await Flight.find()
    .populate("owner", "name")
    .populate("travel", "name")
    .sort({ created: -1 });

  res.json(flightes);
};

exports.getAllAvailableFlightes = async (req, res) => {
  const flightes = await Flight.find({ isAvailable: true })
    .populate("owner", "name phone")
    .populate("travel", "name")
    .sort({ created: -1 });

  res.json(flightes);
};

exports.getAllUnavailableFlightes = async (req, res) => {
  const flightes = await Flight.find({ isAvailable: false })
    .populate("owner", "name phone")
    .populate("travel", "name")
    .sort({ created: -1 });

  res.json(flightes);
};

exports.getAvailableFlightesOfOwner = async (req, res) => {
  const flightes = await Flight.find({ owner: req.ownerauth, isAvailable: true })
    .populate("owner", "name")
    .populate("travel", "name")
    .sort({ created: -1 });

  res.json(flightes);
};

exports.getUnavailableFlightesOfOwner = async (req, res) => {
  const flightes = await Flight.find({ owner: req.ownerauth, isAvailable: false })
    .populate("owner", "name")
    .populate("travel", "name")
    .sort({ created: -1 });

  res.json(flightes);
};

exports.searchFlight = async (req, res) => {
  if (_.size(req.query) < 1)
    return res.status(400).json({ error: "Invalid query" });

  const { startLocation, endLocation, journeyDate } = req.query;

  const flight = await Flight.find({
    startLocation,
    endLocation,
    journeyDate,
    isAvailable: true
  })
    .populate("travel", "name")
    .populate("startLocation", "name")
    .populate("endLocation", "name");

  return res.json(flight);
};

exports.searchFlightByFilter = async (req, res) => {
  const { startLocation, endLocation, journeyDate, travel, type } = req.body;
  const flight = await Flight.find({
    startLocation,
    endLocation,
    journeyDate,
    isAvailable: true,
    travel: { $in: travel },
    type: { $in: type }
  })
    .populate("travel", "name")
    .populate("startLocation", "name")
    .populate("endLocation", "name");
  res.json(flight);
};

exports.create = async (req, res) => {
  const flightExists = await Flight.findOne({ flightNumber: req.body.flightNumber });
  if (flightExists)
    return res.status(403).json({
      error: "Flight is already added!"
    });

  if (req.file !== undefined) {
    const { filename: image } = req.file;

    //Compress image
    await sharp(req.file.path)
      .resize(800)
      .jpeg({ quality: 100 })
      .toFile(path.resolve(req.file.destination, "resized", image));
    fs.unlinkSync(req.file.path);
    req.body.image = "flightimage/resized/" + image;
  }

  if (req.body.boardingPoints) {
    req.body.boardingPoints = req.body.boardingPoints.split(",");
  }

  if (req.body.droppingPoints) {
    req.body.droppingPoints = req.body.droppingPoints.split(",");
  }

  const flight = new Flight(req.body);
  flight.seatsAvailable = req.body.numberOfSeats

  if (!checkDateAvailability(req.body.journeyDate)) {
    flight.isAvailable = false;
  }

  flight.owner = req.ownerauth;

  await flight.save();

  res.json(flight);
};

exports.update = async (req, res) => {
  if (req.file !== undefined) {
    const { filename: image } = req.file;

    //Compress image
    await sharp(req.file.path)
      .resize(800)
      .jpeg({ quality: 100 })
      .toFile(path.resolve(req.file.destination, "resized", image));
    fs.unlinkSync(req.file.path);
    req.body.image = "flightimage/resized/" + image;
  }

  let flight = req.flight;
  flight = _.extend(flight, req.body);

  if (!checkDateAvailability(req.body.journeyDate)) {
    flight.isAvailable = false;
  }

  await flight.save();

  res.json(flight);
};

exports.remove = async (req, res) => {
  let flight = req.flight;
  await flight.remove();
  res.json({ message: "Flight removed successfully" });
};
