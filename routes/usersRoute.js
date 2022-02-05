const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Room = require("../models/room");

router.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();
    // res.json(savedUser);
    res.send("User created successfully");
  } catch (err) {
    // res.json({ message: err });
    res.status(400).json({ err });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user =await User.findOne({ email, password });
    if(user){
      const temp = { //temporary user object for security purposes and to be used in the session
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      };
      res.send(temp);
    }
    else {
      res.status(400).json({ message: "Login failed" }); 
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});



router.get('/getAllUsers', async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  }
  catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
})

module.exports = router;