import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";

function Booking() {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const { id, fromDate, toDate } = useParams();

  const totalDays = moment.duration(
    moment(toDate).diff(moment(fromDate)) //calculate the difference between the dates in days
  ).asDays()+1;




  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.post("/api/rooms/getRoomById", { id })).data;
        setRoom(data);
        setTotalAmount(data.rentPerDay * totalDays);
        setLoading(false);
      } catch (er) {
        setError(er);
      }
    };
    fetchData().then((r) => console.log(r));
  }, [id]);

  const bookRoom = async () => {
   const bookingDetails = {
     room,
     userId:JSON.parse(localStorage.getItem("token"))._id,
     fromDate,
     toDate,
     totalAmount,
     totalDays
   }
    try {
      const data = (await axios.post("/api/booking/bookRoom", bookingDetails)).data;
      console.log(data);
    } catch (er) {
      setError(er);
    }
  };
  return (
    <div className="m-5">
      <div className="row ">
        <div className="col-md-12">
          <h1>Booking</h1>
        </div>
      </div>
      <div className="row justify-content-center align-content-center mt-5 box-shadow">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : error ? (
          <Error />
        ) : (
          <>
            <div className="col-md-6">
              <h3>{room.name}</h3>
              <img src={room.imageUrls[0]} alt="room" className={"mt-3 w-75"} />
            </div>
            <div className={"col-md-6"}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>
                  <span>Name : {JSON.parse(localStorage.getItem('token')).username}</span>
                </p>
                <p>
                  <span>Room Capacity:</span> {room.maxCount}
                </p>
                <p>
                  <span>From Date: {fromDate}</span>
                </p>
                <p>
                  <span>To Date : {toDate}</span>
                </p>
                <p>
                  <span>Room Description:</span> {room.description}
                </p>
              </b>

              <div>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>
                    <span>Total Days: {totalDays}</span>
                  </p>

                  <p>Rent per day:{room.rentPerDay}</p>
                  <p>
                    <span>Total Amount: {totalAmount}</span>
                  </p>
                </b>
              </div>
              <div>
                <button className="btn btn-primary" onClick={bookRoom}>Pay Now</button>
              </div>
            </div>
          </>
        )}
        <Link to="/">Back</Link>
      </div>
    </div>
  );
}

export default Booking;
