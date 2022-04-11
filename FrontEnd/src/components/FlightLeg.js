import React, { useEffect } from "react";
import FlightStop from "./FlightStop";
import FlightStop2 from "./FlightStop2";
// import FlightStop3 from "./FlightStop3";
const FlightLeg = ({ flightLegs }) => {
  useEffect(() => {
    // console.log(flightLegs);
  }, []);

  return (
    <div>
      {flightLegs.stops.length > 0
        ? flightLegs.stops.map((stops) => {
            return [
              <FlightStop flightStops={stops} />,
              // <FlightStop2 flightStops={stops} />,
              // <FlightStop3 flightStops={stops} />,
            ];
          })
        : console.log("no stops for this leg")}
    </div>
  );
};

export default FlightLeg;
