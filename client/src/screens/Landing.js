import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init(
  {
    duration: 2000,
    easing: "ease-in-out",
    once: true
  }
);
const Landing = () => {

  useEffect(() => {
    document.title = "Agents | Home";
  }, []);


    return (
        <div className={'container-fluid bg-img'}>
      <div className={"row landing "}>
        <div className="col-md-9 text-center mx-auto overlay" style={{borderRight:'8px solid white'}}>
          <h2 data-aos={'zoom-in'} className={"text-white title"}>
            Agents Booking
          </h2>
          <h4 className={"text-white mt-2"} data-aos={'zoom-out'}>
            "The best web app to book a Room is to find the right agent."
          </h4>
          <Link to={"/booking"}>
            <button className="btn btn-light mt-3">Book a home</button>
          </Link>
        </div>
      </div>
          </div>
    );
};


export default Landing;