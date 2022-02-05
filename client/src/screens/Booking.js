import React, { useEffect, useState } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'

function Booking() {

  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const { id, fromDate, toDate } = useParams();

  const navigate = useNavigate();

  const totalDays = moment.duration(
    moment(toDate).diff(moment(fromDate)) //calculate the difference between the dates in days
  ).asDays()+1;


  let stripeKey = `pk_test_51JsZdpHW9ZIm3OT3lbNjgEW6Hzb0Wl5IuDC6gi2KDYfZAJ2yIJYlzb2ZFsCr2x18uhdjrXBm6dD5ujKrTLEBhCxw0033UEPomc`;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));

    if (!user) {
      navigate("/login");
    }

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



  const  onToken  =  async (token) => {
      const bookingDetails = {
        room,
        userId:JSON.parse(localStorage.getItem("token"))._id,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        token
      }
    try {
      setLoading(true);
      const data = (await axios.post("/api/booking/bookRoom", bookingDetails)).data;
      setLoading(false);
      Swal.fire({
        title: 'Booking Successful',
        text: 'Your booking has been confirmed',
        icon: 'success',
      }).then(() => {
        navigate("/booking");
      })
      console.log(data);
    } catch (er) {
      setLoading(false);
      Swal.fire({
        title: 'Booking Failed',
        text: 'Please try again',
        icon: 'error',
      })
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

                <StripeCheckout
                    token={onToken}
                    currency="usd"
                    amount={totalAmount * 100}
                    stripeKey="pk_test_51JsZdpHW9ZIm3OT3lbNjgEW6Hzb0Wl5IuDC6gi2KDYfZAJ2yIJYlzb2ZFsCr2x18uhdjrXBm6dD5ujKrTLEBhCxw0033UEPomc"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
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
