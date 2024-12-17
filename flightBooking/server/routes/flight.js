const express = require("express");
const router = express.Router();
const { requireOwnerSignin, isPoster } = require("../controllers/auth-owner");

const {
  read,
  create,
  update,
  remove,
  flightBySlug,
  getFlightes,
  searchFlight,
  searchFlightByFilter,
  getAvailableFlightesOfOwner,
  getUnavailableFlightesOfOwner,
  getAllAvailableFlightes,
  getAllUnavailableFlightes
} = require("../controllers/flight");

const { uploadFlightImage } = require("../helpers");

router
  .route("/")
  .get(getFlightes)
  .post(requireOwnerSignin, uploadFlightImage, create);

router.get(
  "/owner-flight-available",
  requireOwnerSignin,
  getAvailableFlightesOfOwner
);
router.get(
  "/owner-flight-unavailable",
  requireOwnerSignin,
  getUnavailableFlightesOfOwner
);

router.get("/all-flight-available", getAllAvailableFlightes);
router.get("/all-flight-unavailable", getAllUnavailableFlightes);

router.get("/search", searchFlight);
router.post("/filter", searchFlightByFilter);

router
  .route("/:flightSlug")
  .get(read)
  .put(requireOwnerSignin, isPoster, uploadFlightImage, update)
  .delete(requireOwnerSignin, isPoster, remove);

router.param("flightSlug", flightBySlug);

module.exports = router;
