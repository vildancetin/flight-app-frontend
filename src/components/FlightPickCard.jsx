import React, { useEffect, useState } from "react";
import { IoAirplaneSharp } from "react-icons/io5";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { IoMdCalendar } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useListFlights } from "../service/useListFlights";
const FlightPickCard = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setFlights,
  filterValues,
}) => {
  const [btnActive, setBtnActive] = useState("round");
  const [direction, setDirection] = useState("A");
  const [destinationsInput, setDestinationsInput] = useState({
    departure: "",
    arrival: "",
  });
  const flightDirection = direction;

  // List flights by filters using useListFlights hook
  // fillteredeData is an array that contains flight informations
  const { filteredData } = useListFlights(
    "flights",
    startDate,
    filterValues,
    destinationsInput,
    flightDirection
  );

  useEffect(() => {
    setFlights(filteredData || []);
  }, [filteredData, startDate]);

  const handleClick = () => {
    setFlights(filteredData || []);
  };

  // Updates the entered information values
  const handleDestinationsInput = (e) => {
    const { name, value } = e.target;
    if (name === "departure" && value !== "AMS") {
      setDestinationsInput({
        ...destinationsInput,
        departure: value.toUpperCase(),
        arrival: "AMS",
      });
      setDirection("A");
    } else if (name === "arrival" && value !== "AMS") {
      setDestinationsInput({
        ...destinationsInput,
        departure: "AMS",
        arrival: value.toUpperCase(),
      });
      setDirection("D");
    } else {
      setDestinationsInput({
        ...destinationsInput,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleButton = (buttonId) => {
    setBtnActive(buttonId);
  };
  const handleDep = (buttonId) => {
    setDirection(buttonId);
  };

  return (
    <div className="w-full bg-white p-3 rounded-xl">
      {/* Header */}
      <div className="flex justify-between ">
        <div className="flex items-center gap-2">
          <IoAirplaneSharp />
          <span className="text-sm font-bold tracking-wide">
            BOOK YOUR FLIGHT
          </span>
        </div>
        {/* Round trip and One way buttons */}
        <div className="buttons  text-purple  flex gap-4">
          {/* Flight direction is selected */}
          <div className="bg-soft_purple rounded-3xl">
            <button
              className={`rounded-tl-3xl rounded-bl-3xl ${
                direction === "D" ? "active" : ""
              }`}
              onClick={() => handleDep("D")}
            >
              Departure
            </button>
            <button
              className={`rounded-tr-3xl rounded-br-3xl ${
                direction === "A" ? "active" : ""
              }`}
              onClick={() => handleDep("A")}
            >
              Arrival
            </button>
          </div>
          {/* The "active" tag is added according to the active button. */}
          <div className="bg-soft_purple rounded-3xl">
            <button
              className={`rounded-tl-3xl rounded-bl-3xl ${
                btnActive === "round" ? "active" : ""
              }`}
              onClick={() => handleButton("round")}
            >
              Round trip
            </button>
            <button
              className={`rounded-tr-3xl rounded-br-3xl ${
                btnActive === "one_way" ? "active" : ""
              }`}
              onClick={() => handleButton("one_way")}
            >
              One way
            </button>
          </div>
        </div>
      </div>
      {/* Date and Destination Picker */}
      <div className="flex mt-3 gap-3 w-full flex-wrap justify-between">
        {/* Location Inputs */}
        <div className="flex gap-1 justify-center items-center">
          <div className="relative w-full">
            <FaPlaneDeparture className="icon" />
            <input
              type="text"
              name="departure"
              id="departure"
              value={destinationsInput.departure}
              onChange={handleDestinationsInput}
              className="pl-7 focus:ring-2 focus:ring-bg_purple focus:outline-none rounded-tl-xl rounded-bl-xl border-2 border-gray w-44 h-8"
            />
          </div>
          <div className="relative w-full">
            <FaPlaneArrival className="icon" />

            <input
              type="text"
              name="arrival"
              id="arrival"
              value={destinationsInput.arrival}
              onChange={handleDestinationsInput}
              className="pl-7 focus:ring-2 focus:ring-bg_purple focus:outline-none
              rounded-tr-xl rounded-br-xl border-2 border-gray w-44 h-8"
            />
          </div>
        </div>
        {/* Date Picker */}
        <div className="flex gap-1">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date.toISOString().split("T")[0])}
            showIcon
            minDate={new Date()}
            icon={<IoMdCalendar className="text-xl -ml-1 text-purple" />}
            className="w-44 h-8 focus:ring-bg_purple focus:outline-none rounded-tl-xl rounded-bl-xl border-2 border-gray"
          />
          {btnActive !== "one_way" && (
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date.toISOString().split("T")[0])}
              showIcon
              required
              minDate={startDate}
              icon={<IoMdCalendar className="text-xl -ml-1 text-purple" />}
              className="w-44 h-8 focus:ring-bg_purple focus:outline-none rounded-tr-xl rounded-br-xl border-2 border-gray"
            />
          )}
        </div>
      </div>
      {/* Show Flights Button */}
      <button
        className="bg-purple text-white p-2 mt-4 rounded-md text-sm font-medium hover:bg-soft_purple hover:text-purple"
        onClick={handleClick}
      >
        Show flights
      </button>
    </div>
  );
};

export default FlightPickCard;
