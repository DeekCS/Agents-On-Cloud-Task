import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tag } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";

const { TabPane } = Tabs;

export default function Admin() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token")).isAdmin;
    if (!user) {
      navigate("/");
    }
  }, []);
  return (
    <div className={"m-3 box-shadow"}>
      <h2 className={"text-center"}>Admin Panel</h2>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Tag color="blue">Bookings</Tag>
            </span>
          }
          key="2"
        >
          <Bookings />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Tag color="blue">Users</Tag>
            </span>
          }
          key="3"
        >
          <Users />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Tag color="blue">Rooms</Tag>
            </span>
          }
          key="4"
        >
          <Rooms />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Tag color="blue">Add Room</Tag>
            </span>
          }
          key="1"
        >
          <AddRoom />
        </TabPane>
      </Tabs>
    </div>
  );
}

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(async () => {
    try {
      const data = await (await axios.get("/api/booking/getAllBookings")).data;
      setBookings(data);
      setLoading(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
      setError(error);
    }
  }, []);

  return (
    <div className={"row"}>
      <div className="col-md-12">
        <h2>Bookings</h2>
        {loading && <Loader />}
        {bookings.length && <h3>There are total {bookings.length} bookings</h3>}
        {bookings.length > 0 && (
          <table
            className={
              "table table-striped table-bordered table-hover table-responsive table-dark"
            }
          >
            <thead>
              <tr>
                <th>Room</th>
                <th>User</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.room}</td>
                  <td>{booking.userId}</td>
                  <td>{booking.fromDate}</td>
                  <td>{booking.toDate}</td>
                  <td>{booking.status}</td>
                  <td>{booking.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export function Rooms() {
  const [Rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(async () => {
    try {
      const data = await (await axios.get("/api/booking/getAllRooms")).data;
      setRooms(data);
      setLoading(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
      setError(error);
    }
  }, []);

  return (
    <div className={"row"}>
      <div className="col-md-12">
        <h2>Rooms</h2>
        {loading && <Loader />}
        {Rooms.length && <h3>There are total {Rooms.length} Rooms</h3>}
        {Rooms.length > 0 && (
          <table
            className={
              "table table-striped table-bordered table-hover table-responsive table-dark"
            }
          >
            <thead>
              <tr>
                <th>Room Name</th>
                <th>Type</th>
                <th>Rent Per Day</th>
                <th>Max Count</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {Rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.rentPerDay}</td>
                  <td>{room.maxCount}</td>
                  <td>{room.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(async () => {
    try {
      const data = await (await axios.get("/api/users/getAllUsers")).data;
      setUsers(data);
      setLoading(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
      setError(error);
    }
  }, []);

  return (
    <div className={"row"}>
      <div className="col-md-12">
        <h2>Users</h2>
        {loading && <Loader />}
        {users.length && <h3>There are total {users.length} users</h3>}
        {users.length > 0 && (
          <table
            className={
              "table table-striped table-bordered table-hover table-responsive table-dark"
            }
          >
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>isAdmin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Admin" : "User"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export function AddRoom() {
  const [roomName, setRoomName] = useState();
  const [type, setType] = useState();
  const [rentPerDay, setRentPerDay] = useState();
  const [maxCount, setMaxCount] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [description, setDescription] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "roomName":
        setRoomName(value);
        break;
      case "type":
        setType(value);
        break;
      case "rentPerDay":
        setRentPerDay(value);
        break;
      case "maxCount":
        setMaxCount(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "image1":
        setImage1(value);
        break;
      case "image2":
        setImage2(value);
        break;
      case "image3":
        setImage3(value);
        break;
      default:
        break;
    }
    console.log(
      roomName,
      type,
      rentPerDay,
      maxCount,
      phoneNumber,
      description,
      image1,
      image2,
      image3
    );
  };

  const addRoom = async () => {
    setLoading(true);
    try {
      await axios.post("/api/rooms/addRoom", {
        roomName,
        type,
        rentPerDay,
        maxCount,
        phoneNumber,
        description,
        imageUrls: [image1, image2, image3],
      });
      setLoading(false);
      Swal.fire({
        title: "Success",
        text: "Room added successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.value) {
          navigate("/");
        }
      });
    } catch (er) {
      console.log(er);
      Swal.fire({
        title: "Error",
        text: "Error adding room",
        icon: "error",
        confirmButtonText: "OK",
      });
      setLoading(false);
      setError(er);
    }
  };
  return (
    <div className={"row"}>
      <h2>Add Room</h2>
      <div className={"col-md-5"}>
        {loading && <Loader />}
        <div className={"form-group"}>
          <label>Room Name</label>
          <input
            type={"text"}
            className={"form-control"}
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
          />
        </div>
        <div className={"form-group"}>
          <label>Room Type</label>
          <input
            type={"text"}
            className={"form-control"}
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          />
        </div>
        <div className={"form-group"}>
          <label>Rent Per Day</label>
          <input
            type={"number"}
            className={"form-control"}
            value={rentPerDay}
            onChange={(e) => {
              setRentPerDay(e.target.value);
            }}
          />
        </div>
        <div className={"form-group"}>
          <label>Max Count</label>
          <input
            type={"number"}
            className={"form-control"}
            value={maxCount}
            onChange={(e) => {
              setMaxCount(e.target.value);
            }}
          />
        </div>
        <div className={"form-group"}>
          <label>Phone Number</label>
          <input
            type={"number"}
            className={"form-control"}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="col-md-5">
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            rows="5"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Images</label>
          <input
            type={"text"}
            className={"form-control"}
            value={image1}
            placeholder={"Enter Url for Image 1"}
            onChange={(e) => {
              setImage1(e.target.value);
            }}
          />
          <input
            type={"text"}
            className={"form-control"}
            value={image2}
            placeholder={"Enter Url for Image 2"}
            onChange={(e) => {
              setImage2(e.target.value);
            }}
          />
          <input
            type={"text"}
            className={"form-control"}
            value={image3}
            placeholder={"Enter Url for Image 3"}
            onChange={(e) => {
              setImage3(e.target.value);
            }}
          />
        </div>
      </div>
      <button className={"btn btn-primary w-25 mt-3"} onClick={addRoom}>
        Add Room
      </button>
    </div>
  );
}
