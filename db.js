const mongoose = require("mongoose"); // MongoDB ORM

const mongoURL =
  "mongodb+srv://deek:abood12345@cluster0.3brym.mongodb.net/mern-booking";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection; // Connection object

connection.on("error", function () {
  console.log("MongoDB database connection established successfully");
});

connection.on("connected", function () {
  console.log("MongoDB database connection established successfully");
});

module.exports = mongoose; // Export connection
