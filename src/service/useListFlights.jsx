import { useEffect, useState } from "react";
import { useFetch } from "./useFetch"; // kendi hook'unu import et
import { checkDate } from "../helper/formatTime";

// It sends a request with useFetch according to the given filters. And filters the data.
export const useListFlights = (
  path,
  date,
  filterOptions,
  destinationsInput,
  flightDirection
) => {
  const { data, loading, error } = useFetch(
    path,
    date,
    null,
    null,
    flightDirection
  );
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      const filtered = data?.flights.filter((flight) => {
        const scheduleTimeParts = flight.scheduleTime.split(":");
        const hours = parseInt(scheduleTimeParts[0], 10);
        // check the date and return true or false
        const isSameDateOrBefore = checkDate(flight);

        // Filter by locations
        const destinationCondition = (() => {
          if (flightDirection === "D") {
            return flight.route.destinations[0].includes(
              destinationsInput?.arrival.toUpperCase()
            );
          } else {
            return flight.route.destinations[0].includes(
              destinationsInput?.departure.toUpperCase()
            );
          }
        })();
        // Filter by time range
        const timeCondition = (() => {
          if (filterOptions.arrival === "after12") {
            return hours >= 12 && !isSameDateOrBefore;
          } else if (filterOptions.arrival === "before12") {
            return hours < 12 && !isSameDateOrBefore;
          }
          return !isSameDateOrBefore;
        })();
        // Filter by  time range
        const stopsCondition = (() => {
          if (filterOptions.stops === "nonstop") {
            return flight.route.destinations.length === 1;
          } else if (filterOptions.stops === "onestop") {
            return flight.route.destinations.length === 2;
          } else if (filterOptions.stops === "twostop") {
            return flight.route.destinations.length > 2;
          }
          return true;
        })();
        return timeCondition && stopsCondition && destinationCondition; // all conditions
      });

      setFilteredData(filtered);
    }
  }, [data, filterOptions, destinationsInput]);

  return { filteredData, loading, error };
};
