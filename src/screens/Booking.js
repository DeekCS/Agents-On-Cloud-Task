import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";


function Booking() {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.post("/api/rooms/getRoomById", { id })).data;
        setRoom(data);
        setLoading(false);
      } catch (er) {
        setError(er);
      }
    };
    fetchData().then((r) => console.log(r));
  }, [id]);
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
            <h1 className={'alert alert-danger'}>Something went wrong, pleas try again later... </h1>
          ) : (
              <>
              <div className="col-md-6">
              <h3>{room.name}</h3>
              <img src={room.imageUrls[0]} alt="room" className={'mt-3 w-75'} />
              </div>
              <div className={'col-md-6'}>
              <h1>Booking Details</h1>
                  <hr />
                  <b>
                    <p>
                      <span>Name :</span> {room.name}
                    </p>
                    <p>
                      <span>Room Capacity:</span> {room.maxCount}
                    </p>
                      <p>
                          <span>From Date</span>
                      </p>
                    <p>
                      <span>To Date</span>
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
                          <span>Total Days:</span>
                      </p>

                      <p>
                          Rent per day:{room.rentPerDay}
                      </p>
                      <p>
                          <span>Total Amount:</span>
                      </p>
                      </b>
                  </div>
                  <div>
                      <button className="btn btn-primary">Book Now</button>
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
