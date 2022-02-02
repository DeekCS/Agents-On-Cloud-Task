import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";

function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      setLoading(true);
      const data = (await axios.get("/api/rooms/getAllRooms")).data;
      setRooms(data);
      setLoading(false);
    } catch (er) {
      setError(er);
      console.log(er);
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {loading && (
        <p>
          <Loader />
        </p>
      )}
      {
        rooms.length > 1 &&
        <div>
          {rooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </div>
      }

      {error && <p className={"alert alert-danger"}>{error}</p>}
    </div>
  );
}

export default Home;
