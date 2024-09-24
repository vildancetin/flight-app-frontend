import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { RiInformationLine } from "react-icons/ri";
import BookFlight from "../components/BookFlight";
import axios from "axios";
import { toastErrorNotify } from "../helper/ToastNotify";
const MyFlights = () => {
  const buttons = ["times", "stops", "airlines", "airports", "amenities"];
  const starCount = [2, 3, 4, 5, 6]; // Number of selected star

  const [bookFlights, setBookFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  // Sending request to API with cors proxy
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          "https://cors-anywhere.herokuapp.com/https://flight-app-backend-f0ql.onrender.com/flights",
          { headers: {   "X-Requested-With": "XMLHttpRequest" } }
        );
        setBookFlights(data.data.data);
      } catch (error) {
        toastErrorNotify("Data can not fetched!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bg-blue w-full h-full pt-8 pr-8 ">
      <div className="h-full bg-bg_card">
        {/* Buttons and Stars */}
        <div className="h-14 bg-white flex justify-between items-center px-8 shadow-sm">
          {/* Buttons */}
          <div className="flex flex-wrap">
            {buttons.map((item, index) => {
              return (
                <button
                  key={index}
                  className="border border-gray px-3 py-2 rounded-md capitalize font-semibold text-sm mr-4 hover:bg-blue"
                >
                  {item}
                </button>
              );
            })}
            <div className="flex justify-center items-center text-blue text-sm font-semibold">
              <button>Edit Search</button>
              <span className="pl-2">
                <IoIosArrowDown />
              </span>
            </div>
          </div>
          {/* Stars */}
          <div className="flex flex-wrap">
            <div className="flex justify-center items-center">
              {[...Array(5)].map((_, outerIndex) => (
                <div
                  key={outerIndex}
                  className="flex justify-center items-center"
                >
                  <div>
                    {[...Array(2)].map((_, rowIndex) => (
                      <div key={rowIndex} className="flex justify-center">
                        {[...Array(3)].map((_, starIndex) => {
                          // Color black to stars
                          const starNumber = rowIndex * 3 + starIndex;

                          return (
                            <FaStar
                              key={starNumber}
                              className={`${
                                starNumber < starCount[outerIndex]
                                  ? "text-black"
                                  : "text-gray"
                              } text-sm `}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  {outerIndex < 4 && ( // Son yıldız grubundan sonra çizgi olmasın
                    <span className="border-r-2 border-gray h-4 mx-8"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Main Part */}
        <div className=" p-6">
          {/* Sort By and Average */}
          <div className="flex justify-between">
            {/* Sorting Part */}
            <div>
              <label htmlFor="sorting" className=" text-sm  mb-2">
                Sort by:
              </label>
              <select
                name="sorting"
                id="sorting"
                className="text-sm rounded-md focus:outline-none bg-transparent font-semibold  pr-2"
              >
                <option value="recommend">Recommended</option>
              </select>
            </div>
            {/* Avg Fare */}
            <div className="flex justify-center items-center gap-2 font-medium">
              <RiInformationLine className="text-blue" />
              <span>
                Avg Fare: <span className="font-bold">$255</span>
              </span>
            </div>
          </div>
          {/* Listing Booking Flights */}
          <div className="mt-6">
            {loading ? (
              <span>Loading...</span>
            ) : (
              bookFlights
                .sort(
                  (a, b) => new Date(b.scheduleDate) - new Date(a.scheduleDate)
                )
                .map((flight, index) => {
                  return (
                    <BookFlight
                      flight={flight}
                      key={index}
                      setBookFlights={setBookFlights}
                      bookFlights={bookFlights}
                    />
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFlights;
