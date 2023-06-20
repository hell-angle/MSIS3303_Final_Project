import { useEffect, useState } from "react";
import SEATS from "./SeatOptions";
import TAB_OPTIONS from "./TabOptions";
import Button from "./Button";
import { Row, Label, Col, Pagination } from "reactstrap";
import SingleSeat from "./SingleSeat";
const notAvailableSeat = ["J1","K2","A7"];
export default function SeatBooking({ onNext, seatSelection, onPayment }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [isAccepted, setIsAccepted] = useState(false);
  const [selectedSeatKeys, setSelectedSeatKeys] = useState([]);

  function handleUpdateSelection(seatKey) {
    if (isAccepted) {
      // Seats have been accepted, do not update selectedSeats
      return;
    }
  
    if (seatSelection.seatCount <= selectedSeats.length) {
      const ssss = [...selectedSeats, seatKey];
      ssss.shift();
      setSelectedSeats(ssss);
    } else {
      setSelectedSeats([...selectedSeats, seatKey]);
    }
  }
  function handleNext() {
    setIsAccepted(true);
    setSelectedSeatKeys(selectedSeats);
    onPayment();
  }
  function RenderSeatsRow({ structure }) {
    var rows = [];
    for (let i = 1; i <= structure.totalPlaces; i++) {
      rows.push(
        <SingleSeat
          seatNumber={i}
          row={structure.row}
          blank={!structure.seats.includes(i)}
          selected={selectedSeats.includes(`${structure.row}${i}`)}
          updateSelected={handleUpdateSelection}
          available={availableSeats.includes(`${structure.row}${i}`)}
          disabled={selectedSeatKeys.includes(`${structure.row}${i}`)} // Apply the disabled attribute
        />
      );
    }
    return rows;
  }
  function getAvailableSeats() {
    const availableSeats = [];
    SEATS.SEAT_TYPE.map((itemType) => {
      SEATS.SEAT_STRUCTURE[itemType.type].map((rowItem) => {
        rowItem.seats.map((seatItem) =>
          !notAvailableSeat.includes(`${rowItem.row}${seatItem}`)
            ? availableSeats.push(`${rowItem.row}${seatItem}`)
            : null
        );
      });
    });
    return availableSeats;
  }
  useEffect(() => {
    const availableSeats = getAvailableSeats();
    setAvailableSeats(availableSeats);
    handleAutoSelection();
  }, []);

  function handleAutoSelection() {
    const selectedTeam = [];
    console.log("seats", SEATS.SEAT_STRUCTURE[seatSelection.seatType]);
    SEATS.SEAT_STRUCTURE[seatSelection.seatType].map((seatRow) => {
      seatRow.seats.map((seat) => {
        console.log(`${seatRow.row}${seat}`);
        if (
          !notAvailableSeat.includes(`${seatRow.row}${seat}`) &&
          selectedTeam.length < seatSelection.seatCount
        ) {
          selectedTeam.push(`${seatRow.row}${seat}`);
        }
      });
    });
    setSelectedSeats(selectedTeam);
  }

  function handleNext() { }
  return (
    <Row>
      <Col>
        <Label>Select your desired seat</Label>
        <h1 className="screen">Screen</h1>
        {SEATS.SEAT_TYPE.map((item) => (
          <Row key={`${item.type}_type`}>
            <Label>{item.title}</Label>
            {SEATS.SEAT_STRUCTURE[item.type].map((itemRow) => (
              <Row key={itemRow.row}>
                <Pagination aria-label="Page navigation example">
                  <RenderSeatsRow structure={itemRow} />
                </Pagination>
              </Row>
            ))}
          </Row>
        ))}
      </Col>
      <Label>
        Price : $
        {SEATS.SEAT_PRICE[seatSelection.seatType] * seatSelection.seatCount}.00
      </Label>
      <Row>
        <Col>
          <Button onClick={() => onNext(TAB_OPTIONS.SEAT_TYPE)} title="Previous" />{" "}
          <Button onClick={handleNext} title="Next" />
        </Col>
      </Row>
    </Row>
  );
}
