import React from "react";

function Room({ room }) {
  return (
      <div className={'container '}>
    <div className={"row justify-content-center align-content-center mt-5 box-shadow"}>
      <div className={"col-md-4"}>
        <img src={room.imageUrls[0]} alt={room.name} className={"small-img"} />
      </div>
      <div className={"col-md-7"}>
        <h3>{room.name}</h3>
       <b>
         <p>Max Count: {room.maxCount}</p>
         <p>Phone Number: {room.phoneNumber}</p>
         <p>Type: {room.type}</p>
       </b>

        <div className={'d-flex justify-content-end '}>
           <button className={"btn btn-dark mr-3"}>View Details</button>
            <button className={"btn btn-dark "}>Book</button>
        </div>
      </div>

    </div>
    </div>
  );
}

export default Room;
