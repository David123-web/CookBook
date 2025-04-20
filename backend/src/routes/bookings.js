const express = require("express");
const router = express.Router();
const db = require("../database");
const middleware = require("../middleware");

// GET /bookings/:id/:userType
router.get("/:id/:userType", async (req, res, next) => {
  const { id, userType } = req.params;
  console.log("Received request for bookings:", req.params);
  try {
    const bookings = await db.getBookingsByUserType(parseInt(id), userType);
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

// POST /bookings
router.post("/", async (req, res, next) => {
  const { userId, bookingDate } = req.body;
  console.log("Received request to create booking:", req.body);
  if (!bookingDate || !userId) {
    return res.status(400).send({ message: "Booking date and user ID are required" });
  }

  try {
    const newBooking = await db.createBooking(userId, bookingDate);
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

// PUT /bookings
router.put("/", async (req, res, next) => {
  const { bookingId, bookingDate, userId } = req.body;
  console.log("Received request to update booking:", req.body);
  if (!bookingId || !bookingDate || !userId) {
    return res.status(400).send({ message: "Booking ID, date, and user ID are required" });
  }

  try {
    const updatedBooking = await db.updateBookingStatus(
      bookingId,
      bookingDate,
      userId
    );

    if (!updatedBooking) {
      return res.status(404).send({ message: `Booking with id: ${bookingId} not found` });
    }

    res.status(200).send(`Booking with id: ${bookingId} has successfully been updated`);
  } catch (error) {
    next(error);
  }
});

// DELETE /bookings/:id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await db.deleteBooking(id);
    res.status(200).send(`Booking with id: ${id} has successfully been deleted`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
