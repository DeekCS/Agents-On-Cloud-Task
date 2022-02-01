import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";

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
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {rooms.map((room) => (
        <div className={"col-md-12"}>
          <Room key={room.id} room={room} />
        </div>
      ))}
    </div>
  );
}

export default Home;
