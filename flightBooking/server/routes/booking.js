const router = require("express").Router();

const {
  bookingById,
  getOwnerBookings,
  changeVerificationStatus,
  postBooking,
  postSold,
  deleteBooking,
  getAllBookings
} = require("../controllers/booking");

const { checkUserSignin } = require("../controllers/auth-user");
const {
  requireOwnerSignin,
  isBookingOwner,
  requireSuperadminSignin
} = require("../controllers/auth-owner");
const { flightBySlug } = require("../controllers/flight");

router.get("/my", requireOwnerSignin, getOwnerBookings);
router.get("/all", requireSuperadminSignin, getAllBookings);

router.post("/sold/:flightSlug", requireOwnerSignin, postSold)
router.post("/book/:flightSlug", checkUserSignin, postBooking);

router.patch("/:bookingId", requireOwnerSignin, changeVerificationStatus);
router.delete("/:bookingId", requireOwnerSignin, isBookingOwner, deleteBooking);

router.param("flightSlug", flightBySlug);
router.param("bookingId", bookingById);

module.exports = router;
