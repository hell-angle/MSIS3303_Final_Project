import React, { useState } from "react";
import { Container, Row } from "reactstrap";

import "./booking/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import SeatBooking from "./booking/SeatBooking";
import SelectSeatType from "./booking/SelectSeatType";
import Confirmation from "./booking/Confirmation";
import TAB_OPTIONS from "./booking/TabOptions";

export const MovieBook = () => {
  const [tab, setTab] = useState(TAB_OPTIONS.SEAT_TYPE);
  const [seatSelection, setSeatSelection] = useState({});

  function handleTabChange(tab, seatSelection) {
    setTab(tab);
    setSeatSelection(seatSelection);
  }
  
  return (
    <Container>
      <Row>
        <h1>Booking ticket</h1>
      </Row>
      {tab === TAB_OPTIONS.SEAT_TYPE ? (
        <SelectSeatType onNext={handleTabChange} />
      ) : null}
      {tab === TAB_OPTIONS.SEAT_SELECTION ? (
        <SeatBooking onNext={handleTabChange} seatSelection={seatSelection} />
      ) : null}
      {tab === TAB_OPTIONS.CONFIRMATION ? (
        <Confirmation setTab={setTab} seatSelection={seatSelection} />
      ) : null}
    </Container>
  );
};

export default MovieBook;
