import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import Booking from "./screens/Booking";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Admin from "./screens/Admin";
import Landing from "./screens/Landing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/booking" element={<Home />} />
          <Route
            path="/booking/:id/:fromDate/:toDate"
            exact
            element={<Booking />}
          />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/" exact element={<Landing/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
