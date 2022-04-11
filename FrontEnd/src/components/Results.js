import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, Button } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import MockKL from "../mockResponse/KL.json";
import MockXRY from "../mockResponse/XRY.json";
import FlightCard from "./FlightCard";
import FlightSection from "./FlightSection";
import BookingContext from "./context/BookingContext";
import axios from "axios";

const Results = () => {
  const bookingContext = useContext(BookingContext);
  const [selectedFlight, setSelectedFlight] = useState([]);
  const [apiData, setApiData] = useState({ airports: [], flights: [] });
  const [flightDisplay, setFlightDisplay] = useState(<></>);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(bookingContext.booking.queryParams);

    let data = JSON.stringify(bookingContext.booking.queryParams);

    let config = {
      method: "post",
      url: "http://127.0.0.1:5001/getFlights",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(apiData);
    bookingContext.booking.airports = apiData.airports;
    console.log(apiData);
    let display = apiData.flights.map((details, flightIndex) => (
      <FlightSection
        flightDetails={details}
        flightIndex={flightIndex}
        setSelectedFlight={setSelectedFlight}
      ></FlightSection>
    ));
    setFlightDisplay(display);
  }, [apiData]);

  const nextHandler = () => {
    let selectedFlightCounter = 0;
    for (let flight in selectedFlight) {
      if (flight) selectedFlightCounter++;
    }
    if (selectedFlightCounter === 2) {
      bookingContext.setBooking((prev) => {
        let updated = { ...prev, selectedFlight };
        return updated;
      });
      navigate("/passengerDetails");
    } else console.log(`Missing flight selection`);
  };

  // KL test
  // const flightList = MockKL.flights.map((details, flightIndex) => (
  //   <FlightSection
  //     flightDetails={details}
  //     flightIndex={flightIndex}
  //     setSelectedFlight={setSelectedFlight}
  //   ></FlightSection>
  // ));

  // XRY test
  // const flightList = MockXRY.flights.map((details, flightIndex) => (
  //   <FlightSection
  //     flightDetails={details}
  //     flightIndex={flightIndex}
  //     setSelectedFlight={setSelectedFlight}
  //   ></FlightSection>
  // ));

  return (
    <div>
      {/* {flightList} */}
      {flightDisplay}

      <Button onClick={nextHandler}>Next</Button>
    </div>
  );
};

export default Results;
