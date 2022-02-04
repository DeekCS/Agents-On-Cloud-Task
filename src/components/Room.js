import React, { useState } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={"container "}>
      <div
        className={
          "row justify-content-center align-content-center mt-5 box-shadow"
        }
      >
        <div className={"col-md-4"}>
          <img
            src={room.imageUrls[0]}
            alt={room.name}
            className={"small-img"}
          />
        </div>
        <div className={"col-md-7"}>
          <h3>{room.name}</h3>
          <b>
            <p>Max Count: {room.maxCount}</p>
            <p>Phone Number: {room.phoneNumber}</p>
            <p>Type: {room.type}</p>
          </b>

          <div className={"d-flex justify-content-end "}>
            <button className={"btn btn-dark mr-3"} onClick={handleShow}>
              View Details
            </button>

            {fromDate && toDate && ( // if fromDate and toDate are not null
              <Link to={`/booking/${room._id}/${fromDate}/${toDate}`}>
                <button className={"btn btn-dark"}>Book Now</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageUrls.map((imageUrl, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={imageUrl}
                    alt={room.name}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p className={"mt-2"}>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
