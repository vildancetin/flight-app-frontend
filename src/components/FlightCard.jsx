import axios from "axios";
import React, { useState } from "react";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5";
import { useFetch } from "../service/useFetch";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { formatTime, calculateNewTime } from "../helper/formatTime";
import { IoIosArrowUp } from "react-icons/io";

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();

  const [check, setCheck] = useState(false);
  // Sends a request to the API based on flight info received with the useeffect hook
  const { data } = useFetch(`/destinations/${flight.route.destinations[0]}`);

  // Saving flight information to mongodb with API
  const postData = async () => {
    try {
      const response = await axios.post(
        "https://cors-anywhere.herokuapp.com/https://flight-app-backend-f0ql.onrender.com/flights",
        { ...flight },
        { headers: { "X-Requested-With": "XMLHttpRequest" } }
      );
      toastSuccessNotify("Your flight is booked"); //publish the toastify message if posting data successful
      setTimeout(() => {
        navigate("/myflights"); //navigate to myflights page
      }, 2000);
      return response;
    } catch (error) {
      toastErrorNotify("Your flight isn!t booked!");
    }
    console.log(data.data.data);
  };

  const handleClick = async () => {
    await postData();
  };

  return (
    // It contains conditional rendering according to "flightDirection"
    <div>
      <div className="bg-white mt-3 rounded-md w-full p-3 relative ">
        <div className="text-sm font-semibold">
          {flight.flightDirection === "A"
            ? data
              ? data.city
              : flight.route.destinations[0]
            : "Amsterdam"}
          -
          {flight.flightDirection === "A"
            ? "Amsterdam"
            : data
            ? data.city
            : flight.route.destinations[0]}
        </div>
        {/* Information About Flights */}
        <div className="flex mt-2 items-center justify-between">
          {/* Departure */}
          <div className="flex flex-col">
            <div className="flex items-center text-xs gap-2 text-dark_gray font-semibold">
              <FaPlaneDeparture />
              Departure
            </div>
            <span className="font-bold">
              {flight.flightDirection === "D"
                ? formatTime(flight.scheduleTime)
                : "7:35 AM"}
            </span>
            <span className="text-xs text-dark_gray">
              {flight.flightDirection === "A"
                ? `Airport:${flight.route.destinations[0]}`
                : `Airport:AMS`}
            </span>
          </div>
          <div className="w-14 border-t-2 border-dark_gray"></div>
          {/* Info airlines and destination stops */}
          <div className="flex flex-col items-center">
            <span className="text-green text-xs font-medium">Alitalia</span>
            <IoAirplaneSharp className="text-purple" />
            <span className="text-xs">
              {flight.route.destinations.length === 1 && "(NonStop)"}
              {flight.route.destinations.length === 2 && "(1 Stop)"}
              {flight.route.destinations.length > 2 &&
                `(${flight.route.destinations.length - 1}+ Stops)`}
            </span>
          </div>
          <div className="w-14 border-t-2 border-dark_gray"></div>
          {/* Arrival */}
          <div className="flex flex-col">
            <div className="flex items-center text-xs gap-2 text-dark_gray font-semibold">
              <FaPlaneArrival />
              Arrival
            </div>
            <span className="font-bold">
              {flight.flightDirection === "A"
                ? formatTime(flight.scheduleTime)
                : formatTime(calculateNewTime(flight.scheduleTime, 2))}
            </span>
            <span className="text-xs text-dark_gray">
              {flight.flightDirection === "A"
                ? "Airport:AMS"
                : `Airport:${flight.route.destinations[0]}`}
            </span>
          </div>
        </div>
        {/* Price and conditional rendering*/}
        <div className="flex justify-between">
          <div className="flex flex-col mt-4">
            <span className="text-sm text-purple font-bold">Price: $200</span>
            <span className="text-xs">Round Trip</span>
            {/* Conditional rendering based on check state */}
            {check && (
              <div className="flex mt-4">
                <div className="flex flex-col">
                  <span className="text-xs text-purple font-bold">
                    Flight Date:{" "}
                    <span className="text-dark_gray">
                      {flight.scheduleDate}
                    </span>
                  </span>
                  <span className="text-xs text-purple font-bold">
                    Flight Name:{" "}
                    <span className="text-dark_gray">{flight.flightName}</span>
                  </span>
                  <span className="text-xs text-purple font-bold">
                    Flight Number:{" "}
                    <span className="text-dark_gray">
                      {flight.flightNumber}
                    </span>
                  </span>
                </div>
                <IoIosArrowUp
                  onClick={() => setCheck(false)}
                  className="pl-4 text-4xl text-purple font-bold"
                />
              </div>
            )}
          </div>
        </div>
        {/* Booking Flight */}
        <div>
          <button
            className="px-6 py-4 bg-purple text-white absolute bottom-0 right-0 rounded-br-md rounded-tl-md text-sm hover:bg-soft_purple hover:text-purple"
            onClick={handleClick}
          >
            Book Flight
          </button>
        </div>
      </div>
      {/* Conditional rendering based on check state */}
      {check || (
        <button
          className="underline px-4 py-3 bg-soft_purple text-purple rounded-bl-md rounded-br-md text-xs font-semibold hover:bg-purple hover:text-soft_purple"
          onClick={() => setCheck(true)}
        >
          Check the details
        </button>
      )}
    </div>
  );
};

export default FlightCard;
