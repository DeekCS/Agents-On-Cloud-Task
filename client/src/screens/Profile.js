import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

export default function Profile() {
  useEffect(() => {
    document.title = "Agents | Profile";
  }, []);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("token"));
  if (!user) {
    navigate("/login");
  }

  return (
    <div className={"m-3"}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>Profile</h1>
          <br />
          <div>
            <h3>Name :{user.username}</h3>
            <h3>Email : {user.email}</h3>
            <h3>
              isAdmin :
              {user.isAdmin ? (
               <span>

                 <Link  className={'m-2'} to="/admin">
                    Yes
                 </Link>
               </span>
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </h3>
          </div>
        </TabPane>
        <TabPane tab="My Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("token"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      setLoading(true);
      const data = await axios.post("/api/booking/getBookingsByUserId", {
        userId: user._id,
      });
      console.log(data);
      setBookings(data.data.bookings);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.message);
      console.log(e);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }, []);

  const cancelBooking = async (bookingId, roomId) => {
    try {
      setLoading(true);
      const data = (
        await axios.post("/api/booking/cancelBooking", {
          bookingId,
          roomId,
        })
      ).data;
      console.log(data);
      setBookings(data.data.bookings);
      setLoading(false);
      Swal.fire({
        title: "Booking Cancelled",
        text: "Your booking has been cancelled",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.value) {
          navigate("/profile");
        }
      });
    } catch (e) {
      setLoading(false);
      setError(e.message);
      console.log(e);
    }
  };
  return (
    <div className={"row"}>
      <div className="col-md-6">
        {loading ? <Loader /> : null}
        {
          //loop throw bookings and display them in a table
        }
        {bookings.map((booking, index) => {
          return (
            <div className={"card mb-3"} key={index}>
              <div className={"card-body"}>
                <h5 className={"card-title"}>{booking.room}</h5>
                <p className={"card-text"}>CheckIn:{booking.fromDate}</p>
                <p className={"card-text"}>CheckOut:{booking.toDate}</p>
                <p className={"card-text"}>Price:{booking.totalAmount}</p>
                <p
                  className={
                    "card-text justify-content-center align-content-center"
                  }
                >
                  Status:
                  {booking.status === "booked" ? (
                    <Tag c icon={<CheckCircleOutlined />} color="success">
                      Confirmed
                    </Tag>
                  ) : (
                    <Tag icon={<CloseCircleOutlined />} color="error">
                      Canceled
                    </Tag>
                  )}
                </p>
              </div>
              {booking.status !== "cancelled" ? (
                <div className={"card-footer d-flex flex-row-reverse"}>
                  <button
                    className={"btn btn-danger"}
                    onClick={() => cancelBooking(booking._id, booking.roomId)}
                  >
                    Cancel Booking
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
