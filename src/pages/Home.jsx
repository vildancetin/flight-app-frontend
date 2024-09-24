import React, { useEffect, useState } from "react";
import FlightPickCard from "../components/FlightPickCard";
import FlightCard from "../components/FlightCard";
import RentCard from "../components/RentCard";
import FilterCard from "../components/FilterCard";
import Navbar from "../components/Navbar";
import infos from "../helper/rentInfos";

const Home = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterValues, setFilterValues] = useState({
    sorting: "lowestPrice",
    arrival: "before12",
    stops: "nonstop",
    airlines: "alitalia",
  });
  const [flights, setFlights] = useState([]);

  return (
    <div className="bg-bg_purple flex justify-center p-10 h-screen">
      <div className=" bg-bg_card w-full shadow-bottom rounded-md px-4 pt-3 h-full overflow-hidden  pb-12">
        <Navbar />
        <div className="flex mt-3 gap-3 h-full">
          {/* Main part- It allows to pick the date and shows flights */}
          <div className="w-4/5 h-full flex flex-col ">
            <FlightPickCard
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setFlights={setFlights}
              filterValues={filterValues}
            />
            {/* Flights List */}
            <div className="flex overflow-hidden h-full gap-3">
              {flights.length > 0 ? (
                <div className="w-3/4 overflow-y-auto no-scrollbar h-full pb-2">
                  {flights.map((flight, index) => {
                    return <FlightCard flight={flight} key={index} />;
                  })}
                </div>
              ) : (
                <span className="w-3/4">Nothing to show</span>
              )}

              {/* Filtering Part */}
              <div className="mt-3 w-1/4 h-full overflow-y-auto no-scrollbar pb-8">
                <FilterCard
                  filterValues={filterValues}
                  setFilterValues={setFilterValues}
                />
              </div>
            </div>
          </div>
          {/* Right Side- It shows Car-rentals hotels and travel packages */}
          <div className="w-1/5 flex flex-col h-full">
            <div className="flex-1 flex flex-col justify-between">
              {infos.map((item, index) => (
                <RentCard item={item} key={index} className="flex-1" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
