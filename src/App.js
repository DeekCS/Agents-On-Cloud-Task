import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import Booking from "./screens/Booking";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Profile from "./screens/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/booking" element={<Booking />} />*/}
          <Route
            path="/booking/:id/:fromDate/:toDate"
            exact
            element={<Booking />}
          />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/profile" exact element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
