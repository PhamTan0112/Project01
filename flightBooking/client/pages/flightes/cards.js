import SingleCard from "./singleCard";
import { Row, Col } from "antd";
import { useCallback } from "react";
// import NepaliDate from "ad-bs-converter";

const Cards = ({ flightes = [] }) => {
  const calculateEmptySeats = useCallback(() => {
    if (!flightes.length) return 0;

    let totalAvailable = 0;

    flightes.forEach((flight) => {
      totalAvailable += flight.seatsAvailable;
    });

    return totalAvailable;
  }, [flightes])

  // const nepaliDate =
  //   flightes[0] &&
  //   NepaliDate.ad2bs(flightes[0].journeyDate.replace("-", "/").replace("-", "/"))
  //     .en || Date.now();

  const markup =
    flightes.length <= 0 ? (
      <h2>No flight found</h2>
    ) : (
      <div className="cards">
        <div className="card-header">
          <h2>
            <b>{calculateEmptySeats()}</b> seats available in{" "}
            <strong>{flightes.length}</strong> flightes
          </h2>
        </div>
        {/* <h4 className="card-header" style={{ color: "red" }}>
          {`Date: ${nepaliDate.strMonth} ${nepaliDate.day}, ${nepaliDate.year}`}
        </h4> */}
        <div>
          <hr />
          <Row className="flightes-header">
            <Col span={4}></Col>
            <Col span={4}>
              <h3>Travels</h3>
            </Col>
            <Col span={4}>
              <h3>Flight Type</h3>
            </Col>
            <Col span={4}>
              <h3>Departure</h3>
            </Col>
            <Col span={4}>
              <h3>Available</h3>
            </Col>
            <Col span={4}>
              <h3>Fare</h3>
            </Col>
          </Row>
          {flightes.length > 0 &&
            flightes.map((flight) => <SingleCard key={flight._id} flight={flight} />)}
        </div>
      </div>
    );

  return markup;
};

export default Cards;
