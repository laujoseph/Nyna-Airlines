import React from "react";
import NavBar from "./components/NavBar";
import { createTheme, ThemeProvider } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { Route, Routes } from "react-router";
import SearchFlight from "./components/SearchFlight";
import Search from "./components/Search";
import Test from "./components/Test";
import Results from "./components/Results";
import ParticularsForm from "./components/ParticularsForm";
import PassengerForm from "./components/PassengerForm";

const theme = createTheme({
  palette: {
    primary: cyan,
    secondary: {
      main: "#fefefe",
    },
  },
  typography: {
    fontFamily: "Quicksand,Roboto,Arial",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar></NavBar>
        {/* <h1>test</h1> */}

        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="/passengerForm" element={<PassengerForm />} />
          <Route path="/ParticularsForm" element={<ParticularsForm />} />
          <Route path="/manage" element={<h1>Manage Booking route</h1>} />
          <Route path="/signup" element={<h1>Signup route</h1>} />
          <Route path="/booking" element={<h1>Booking route</h1>} />
          <Route
            path="/bookingSummary"
            element={<h1>bookingSummary route</h1>}
          />
          <Route
            path="/seatSelection"
            element={<h1>seat Selection route</h1>}
          />
          <Route path="/test" element={<Test />} />
        </Routes>

        {/* <Search />
        <Results /> */}
      </div>
    </ThemeProvider>
  );
}
