const express = require("express");
const app = express(); // create an instance of express

const dbConfig = require("./db"); // import db config file to use its connection method

const roomRoutes = require("./routes/roomsRoute");
const usersRoutes = require("./routes/usersRoute");
const bookingRoutes = require("./routes/bookingRoute");
app.use(express.json()); // to parse incoming requests

app.use("/api/rooms", roomRoutes); // use the rooms route to handle all requests to /api/rooms endpoint
app.use("/api/users", usersRoutes); // use the users route to handle all requests to /api/users endpoint
app.use("/api/booking", bookingRoutes);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port using ${port}`)); // listen on port 5000
