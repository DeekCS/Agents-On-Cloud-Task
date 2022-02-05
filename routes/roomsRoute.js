const express = require("express");
const router = express.Router();

const Room = require("../models/room"); // Import the Room model to use its methods and properties in this file

router.get("/getAllRooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.send(rooms); // Send the rooms array to the client
  } catch (err) {
    res.status(400).json({ message: err.message }); // If an error occurs, send the error message to the client
  }
});

// Get a room by its id using post request and send the room to the client using params
router.post("/getRoomById", async (req, res) => {
  try {
    const room = await Room.findById(req.body.id);
    res.send(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/addRoom', async (req, res) => {
  try {
    const room = new Room({
      name: req.body.roomName,
      type: req.body.type,
      rentPerDay: req.body.rentPerDay,
      maxCount: req.body.maxCount,
      description: req.body.description,
      phoneNumber: req.body.phoneNumber,
      imageUrls: req.body.imageUrls,
    });
    const newRoom = await room.save();
    res.send(newRoom);
    console.log(newRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; // Export the router, so it can be used in other files
