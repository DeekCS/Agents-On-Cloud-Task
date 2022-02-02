import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import Booking from "./screens/Booking";
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
            {/*<Route path="/booking" element={<Booking />} />*/}
            <Route path="/booking/:id" exact element={<Booking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
