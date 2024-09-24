import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import BookFlightCard from "./BookFlightCard";
import { formatTime, calculateNewTime, checkDate } from "../helper/formatTime";
import asia from "../assets/asia.png";
import blue from "../assets/blue.png";
import british from "../assets/british.png";
import lufthansa from "../assets/lufthansa.png";
import pegasus from "../assets/pegasus.png";
import thy from "../assets/thy.png";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import axios from "axios";

const BookFlight = ({ flight, setBookFlights, bookFlights }) => {
  // Sample titles , prices , airlines
  const prices = [156, 204, 356, 182, 400, 225, 253, 183, 449, 407];
  const titles = [
    "Main",
    "Comfort+",
    "Delta One",
    "First",
    "AnyTime",
    "Business Selecet",
    "Economy",
    "Economy Flexible",
  ];
  const airlines = [asia, blue, british, lufthansa, pegasus, thy];
  const airlineIndex = Math.floor(Math.random() * airlines.length);

  const randomNum = Math.floor(Math.random() * 6);

  // Choose random price and title info
  const getRandomFlightInfo = () => {
    const randomPrice = prices[Math.floor(Math.random() * prices.length)];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    return { price: randomPrice, title: randomTitle };
  };

  // Returns an array containing random information at random locations
  const fillRandomFlightData = () => {
    const flightData = Array(5).fill(null);

    for (let i = 0; i < randomNum; i++) {
      const randomIndex = Math.floor(Math.random() * 5);

      if (flightData[randomIndex] === null) {
        flightData[randomIndex] = getRandomFlightInfo();
      } else {
        let newRandomIndex;
        do {
          newRandomIndex = Math.floor(Math.random() * 5);
        } while (flightData[newRandomIndex] !== null);

        flightData[newRandomIndex] = getRandomFlightInfo();
      }
    }

    return flightData;
  };

  // Delete datas from API by ID
  const deleteData = async (flightId) => {
    try {
      const data = await axios.delete(
        `https://cors-anywhere.herokuapp.com/https://flight-app-backend-f0ql.onrender.com/flights/${flightId}`,
        { headers: { "X-Requested-With": "XMLHttpRequest" } }
      );
      setBookFlights(
        bookFlights
          .filter((f) => f._id !== flightId)
          .sort((a, b) => new Date(b.scheduleDate) - new Date(a.scheduleDate))
      );
      toastSuccessNotify("Flight deleted successfully!");
    } catch (error) {
      toastErrorNotify("Data can not deleted!");
    }
  };
  const flightData = fillRandomFlightData();
  return (
    // Fill in informations according to conditions
    <div
      className={`p-6 flex justify-between shadow-md rounded-md my-4 w-full ${
        checkDate(flight) ? "bg-gray bg-opacity-45" : "bg-white"
      }`}
    >
      {/* Main Part */}
      <div className="flex gap-4 flex-wrap">
        <img
          src={airlines[airlineIndex]}
          alt="airline"
          className="w-10 h-10 object-contain"
        />
        <div className="flex flex-col gap-3">
          {/* Times */}
          <span className="text-2xl">
            {flight.flightDirection === "D"
              ? formatTime(flight.scheduleTime)
              : "7:35 AM"}
            -
            {flight.flightDirection === "A"
              ? formatTime(flight.scheduleTime)
              : formatTime(calculateNewTime(flight.scheduleTime, 2))}
          </span>
          {/* Infos Part*/}
          <div className="flex justify-between gap-10">
            {/* Airlines and date infos */}
            <div className="flex flex-col justify-start items-start mr-6">
              <span className="text-sm font-semibold">
                {" "}
                {flight.prefixIATA} Air Lines
              </span>
              {/* Flight Details */}
              <div className="flex justify-center items-center text-blue text-sm font-semibold hover:underline">
                <button>Flight Details</button>
                <span className="pl-2">
                  <IoIosArrowDown />
                </span>
              </div>
              <span className="text-sm font-semibold mt-2">
                Date: {flight.scheduleDate}
              </span>
            </div>
            {/* Stops and Hours */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {flight.route.destinations.length === 1
                  ? "Nonstop"
                  : flight.route.destinations.length === 2
                  ? "1 Stop"
                  : "2+ Stop"}
              </span>
              <span className="text-dark_gray">1h 32m</span>
            </div>
            {/* Destionations and Flight Infos */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {flight.flightDirection === "A"
                  ? `${flight.route.destinations[0]} to AMS`
                  : ` AMS to ${flight.route.destinations[0]}`}
              </span>
              <span className="text-dark_gray">
                {flight.prefixIATA} {flight.flightNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Fill in the cards by random informations */}
      <div className="flex gap-5 ">
        {flightData.map((data, index) => (
          <BookFlightCard key={index} data={data} />
        ))}
      </div>
      {/* Delete flight */}
      <button
        className="text-3xl text-blue hover:scale-105"
        onClick={() => deleteData(flight._id)}
      >
        <MdOutlineDeleteOutline />
      </button>
    </div>
  );
};

export default BookFlight;
