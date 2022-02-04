import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

const { RangePicker } = DatePicker;

function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  useEffect(async () => {
    try {
      setLoading(true);
      const data = (await axios.get("/api/rooms/getAllRooms")).data;
      setRooms(data);
      setDuplicateRooms(data);
      setLoading(false);
    } catch (er) {
      setError(er);
      console.log(er);
      setLoading(false);
    }
  }, []);

  const filterByDate = (dates) => {
    setFromDate(moment(dates[0]).format("YYYY-MM-DD"));

    setToDate(moment(dates[1]).format("YYYY-MM-DD"));

    let tempRooms = [];
    let isAvailable = false;

    for (const room of duplicateRooms) {
      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          if (!moment(moment(dates[0]).format("YYYY-MM-DD")).isBetween(booking.fromDate, booking.toDate)
              && !moment(moment(dates[1]).format("YYYY-MM-DD")).isBetween(booking.fromDate, booking.toDate)
          ) {
            if (
                moment(dates[0]).format("YYYY-MM-DD") !== booking.fromDate &&
                moment(dates[0]).format("YYYY-MM-DD") !== booking.toDate &&
                moment(dates[1]).format("YYYY-MM-DD") !== booking.fromDate &&
                moment(dates[1]).format("YYYY-MM-DD") !== booking.toDate
            ) {
              isAvailable = true;
            }
          }
        }
      }
      if (isAvailable == true || room.currentBookings.length === 0) {
        tempRooms.push(room);
      }
      setRooms(tempRooms);
    }
  };

  return (
    <div className={"container"}>
      <div className="row mt-5">
        <div className="col-md-3 ">
          <RangePicker format={"DD-MM-YYYY"} onChange={filterByDate} />
        </div>
      </div>
      <div className={"row justify-content-center mt-5"}>
        <h1>Home</h1>
        {loading && (
          <p>
            <Loader />
          </p>
        )}
        {rooms.length > 1 && (
          <div>
            {rooms.map((room) => (
              <Room
                key={room.id}
                room={room}
                fromDate={fromDate}
                toDate={toDate}
              />
            ))}
          </div>
        )}

        {error && <p className={"alert alert-danger"}>{error}</p>}
      </div>
    </div>
  );
}

export default Home;
