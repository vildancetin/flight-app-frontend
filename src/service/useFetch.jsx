import axios from "axios";
import { useState, useEffect } from "react";

// Make a request to the API according to the given parametres
export const useFetch = (
  path,
  date = null,
  time = null,
  currentPage = 0,
  flightDirection = null
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = process.env.REACT_APP_BASE_URL;
  const app_key = process.env.REACT_APP_KEY;
  const app_id = process.env.REACT_APP_ID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Determines query requests
        const queryParams = {};
        if (date) queryParams.scheduleDate = date;
        if (time) queryParams.scheduleTime = time;
        if (currentPage) queryParams.page = currentPage;
        if (flightDirection === "D") {
          queryParams.flightDirection = flightDirection;
        }
        const query = new URLSearchParams(queryParams).toString();

        const finalPath = query ? `${path}?${query}` : path;

        const response = await axios(
          `https://cors-anywhere.herokuapp.com/${URL}/${finalPath}`,
          {
            headers: {
              app_id: app_id,
              app_key: app_key,
              Accept: "application/json",
              ResourceVersion: "v4",
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [URL, path, date, time, currentPage, flightDirection]);

  return { data, loading, error };
};
