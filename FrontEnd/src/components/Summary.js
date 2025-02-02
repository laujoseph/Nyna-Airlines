import React, { useState, useEffect, useContext } from "react";
import BookingContext from "./context/BookingContext";
import { Button, Typography, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import FlightCard from "./FlightCard";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PaidIcon from "@mui/icons-material/Paid";

const Summary = (props) => {
  const bookingContext = useContext(BookingContext);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [flightDetails, setFlightDetails] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let summary = [];
    for (let i = 0; i < bookingContext.booking.passengerInfo.length; i++) {
      summary.push(
        <Container>
          <Typography variant="h4" key={nanoid()}>
            Passenger {i + 1}
          </Typography>
          {bookingContext.booking.queryParams.cabinClass === "Y" ? (
            <Typography variant="h6">
              <strong>ECONOMY</strong>
            </Typography>
          ) : (
            <Typography variant="h6">
              <strong>BUSINESS</strong>
            </Typography>
          )}
          <Typography variant="p" key={nanoid()}>
            <strong>Name: </strong>
            {bookingContext.booking.passengerInfo[i].title +
              " " +
              bookingContext.booking.passengerInfo[i].firstName +
              " " +
              bookingContext.booking.passengerInfo[i].lastName}
          </Typography>
          <Typography>
            <strong>Email: </strong>
            {bookingContext.booking.passengerInfo[i].email}
          </Typography>
          <Typography>
            <strong> Contact: </strong>
            {bookingContext.booking.passengerInfo[i].mobile}
          </Typography>

          {bookingContext.booking.seatSelection && (
            <>
              <Typography>
                <strong>Seat Selection: </strong>
              </Typography>
              {bookingContext.booking.legs.map((leg, index) => {
                return (
                  <Container>
                    <Typography>
                      SQ {leg.flightNumber}:{" "}
                      {bookingContext.booking.seatSelection[i][index]}
                    </Typography>
                  </Container>
                );
              })}
            </>
          )}
        </Container>
      );
    }
    setPassengerDetails(summary);

    let flightSummary = [];
    for (let segment of bookingContext.booking.selectedFlight) {
      flightSummary.push(
        <FlightCard flightSegments={segment} displaySelect={false}></FlightCard>
      );
    }

    setFlightDetails(flightSummary);
  }, []);

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    navigate("/PassengerDetails");
  };

  const paymentHandler = () => {
    fetch("https://nyna-airlines-server.herokuapp.com/makePayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingContext.booking),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.log(e.error);
      });
  };

  return (
    <>
      <Container sx={{ marginY: "1em" }} maxWidth="xl">
        <Typography variant="h2">Booking Summary</Typography>
        {bookingContext.booking.type === "manage" && (
          <Typography variant="h3">
            Booking Reference: {bookingContext.booking.bookingRef}
          </Typography>
        )}
        <Container sx={{ marginY: "1.5em" }}>
          <Typography variant="h4">Passenger Details</Typography>
          <Stack direction="row" sx={{ marginY: "1em" }}>
            {passengerDetails}
          </Stack>
        </Container>
        <Container sx={{ marginY: "1.5em" }}>
          <Typography variant="h4">Flight Details</Typography>
          <Container>{flightDetails}</Container>
        </Container>
        <Container sx={{ marginY: "1em" }}>
          <Typography variant="h5">
            Fare per passenger: $
            {(
              Math.round(bookingContext.booking.farePerPax * 100) / 100
            ).toFixed(2)}
          </Typography>
          <Typography variant="h4">
            Grand Total: $
            {(
              Math.round(
                bookingContext.booking.farePerPax *
                  bookingContext.booking.passengerInfo.length *
                  100
              ) / 100
            ).toFixed(2)}
          </Typography>
        </Container>
        {bookingContext.booking.type === "manage" ? (
          <Container>
            <Typography variant="h4">
              Payment Status:{" "}
              {bookingContext.booking.paymentSuccess
                ? "Success"
                : "Unsuccessful"}
            </Typography>
            {!bookingContext.booking.paymentSuccess && (
              <Button
                type="submit"
                onClick={paymentHandler}
                size="large"
                endIcon={<PaidIcon />}
                sx={{ marginY: "2em" }}
              >
                Make Payment
              </Button>
            )}
          </Container>
        ) : (
          <Container>
            <Button
              type="submit"
              onClick={handleSubmitEdit}
              size="large"
              endIcon={<ModeEditIcon />}
              sx={{ marginY: "2em" }}
            >
              Edit
            </Button>
            <Button
              type="submit"
              onClick={paymentHandler}
              size="large"
              endIcon={<PaidIcon />}
              sx={{ marginY: "2em" }}
            >
              Make Payment
            </Button>
          </Container>
        )}
      </Container>
    </>
  );
};

export default Summary;
