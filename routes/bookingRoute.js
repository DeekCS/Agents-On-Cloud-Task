const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const { v4: uuidv4 } = require("uuid");
const Stripe = require("stripe")(
  "sk_test_51JsZdpHW9ZIm3OT38lhmbZEmTh3GdgR0FiZ7t30f9YDO9VLBtQJA1LY08u1qty3vIJYZ95DqkDdDst1dFaTBAvjo006Hk2AHoS"
);

router.post("/bookRoom", async (req, res) => {
  const { room, fromDate, toDate, userId, totalDays, totalAmount, token } =
    req.body;

  try {
    const customer = await Stripe.customers.create({
      email: token.email, // customer email, which user will use to pay
      source: token.id, // token object returned from stripe
    });

    const charge = await Stripe.charges.create(
      {
        // charge the customer
        amount: totalAmount * 100, // amount in cents
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Booking for ${room} room from ${fromDate} to ${toDate}`,
      },
      {
        idempotencyKey: uuidv4(), // prevent duplicate charges for same customer and room in same time period
      }
    );

    if (charge.status === "succeeded") {
      const booking = new Booking({
        room:room.name,
        roomId: room._id,
        fromDate,
        toDate,
        userId,
        totalDays,
        totalAmount: totalAmount * 100,
        transactionId: charge.id,
      });

      await booking.save();

      res.status(200).json({
        message: "Booking successful",
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

router.post('/getBookingsByUserId', async (req, res) => {
  const { userId } = req.body;

  try {
    const bookings = await Booking.find({ userId });

    res.status(200).json({
      bookings
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

router.post('/cancelBooking', async (req, res) => {
  const { bookingId, roomId } = req.body;

  try {
    const bookingItem = await Booking.findById(bookingId);

    bookingItem.status = 'cancelled';

    await bookingItem.save();

    const room = await Room.findById(roomId);

    const bookings = room.currentBookings;

    const temp = bookings.filter(booking => booking._id !== bookingId);

    room.currentBookings = temp; // update the room bookings

    await room.save(); // save the room with the updated bookings

    res.status(200).json({
      message: 'Booking cancelled'
    });

  }
  catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
})

router.get('/getAllBookings', async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.send(bookings);
  }
  catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
})


router.get('/getAllRooms', async (req, res) => {
  try {
    const Rooms = await Room.find();

    res.send(Rooms);
  }
  catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
})


module.exports = router;
