# FLIGHT APP
## Outline
## Get Started

- This application allows users to enter a flight code and search for flights based on date and direction. It utilizes the Schiphol API to list flights. The data returned from the API is filtered based on the specified query parameters.Users can make reservations for the desired flights, which are then saved to the database. 

- The reserved flights will be listed on the "My Flights" page, allowing users to easily view and manage their bookings.

- "Before starting, make sure to complete the steps in the CORS section."

### Technologies Used

- tailwind
- react -router
- react-icons
- react-toastify
- react-datepicker
- axios

### API Usage

- Flight data is retrieved in groups of 20 due to pagination. In the returned data from the API, the destination is set according to the flightDirection, either as a departure or arrival point. Since flight duration is not specified, departure or arrival times are set manually.
- Sometimes the information does not arrive because it says "too many requests" and you have to wait a while.

- The data returned from the API is structured as follows:

```javascript
{
    "lastUpdatedAt": "2024-09-15T01:30:38.911+02:00",
    "aircraftType": {
        "iataMain": "73F",
        "iataSub": "73P"
    },
    "flightDirection": "D",
    "flightName": "QY1444",
    "flightNumber": 1444,
    "id": "140723979296217335",
    "isOperationalFlight": true,
    "mainFlight": "QY1444",
    "prefixIATA": "QY",
    "prefixICAO": "BCS",
    "airlineCode": 289,
    "publicFlightState": {
        "flightStates": [
            "SCH"
        ]
    },
    "route": {
        "destinations": [
            "LEJ"
        ],
        "eu": "S",
        "visa": false
    },
    "scheduleDateTime": "2024-09-25T02:55:00.000+02:00",
    "scheduleDate": "2024-09-25",
    "scheduleTime": "02:55:00",
    "serviceType": "F",
    "schemaVersion": "4"
}
```

### CORS Issue

- To bypass the CORS restriction when making requests to the API, "https://cors-anywhere.herokuapp.com/" is prefixed to the request URL.
- Before starting, you need to go to the address https://cors-anywhere.herokuapp.com/corsdemo and activate it.
## Custom Hooks

### useFetch()

- A hook named useFetch was created, which accepts parameters for path and the data to be filtered. If there are data to be filtered, these are added to queryParams, which is then returned as a query string. 
- This information is used to make requests to the API, and the returned data is returned by the hook.

```javascript
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
      }
```

### useListFlights()

- The useListFlights hook was created to filter the returned data when no query is made. It uses the useFetch hook to make the request, and additional filters are applied based on destination, time range, and stopover information. 
- The newly filtered data is then returned.

```javascript
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
```

## Components

### FlightPickCard

- The application retrieves flight data by making a request to the /flights endpoint using the useListFlights hook:

```javascript
const { filteredData } = useListFlights(
  "flights",
  startDate,
  filterValues,
  destinationsInput,
  flightDirection
);
```

- The filteredData returned from this request is used to list the available flights. Users can select location codes and flight times as per their preferences.

### FlightCard

- The application features a card structure where flight information is displayed. When a user wishes to make a reservation for a flight, a POST request is sent to the custom API to save the flight details in the database.

- The selected flight information is sent as a parameteter.
```javascript
try {
  const response = await axios.post(
    "https://cors-anywhere.herokuapp.com/https://flight-app-backend-f0ql.onrender.com/flights",
    { ...flight },
    { headers: { "X-Requested-With": "XMLHttpRequest" } }
  );
  toastSuccessNotify("Your flight is booked"); // Display success message if data posting is successful
  setTimeout(() => {
    navigate("/myflights"); // Navigate to the My Flights page
  }, 2000);
  return response;
}
```

- The flight API also returns airport codes. To make these codes more meaningful, a request is made to the /destinations endpoint to retrieve the relevant information.

```javascript
const { data } = useFetch(`/destinations/${flight.route.destinations[0]}`);
```

### Book Flight

- This section represents the card structure for the user's booked flights. Users can also delete their selected flights if needed.

- To delete a booked flight, a DELETE request is sent as follows:

```javascript
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
    }
```

- This code snippet sends a request to remove the flight identified by flightId, updates the state to reflect the remaining booked flights, and displays a success message.

## Backend
- To enable users to make reservations for their selected flights, I developed an API using Node.js, with MongoDB as the database. Information related to the selected flight is sent as parameters and saved to MongoDB. 
- The saved data is then displayed on the "My Flights" page.Sometimes it may take along time for the link to be requested.
- Backend Link -> https://flight-app-backend-f0ql.onrender.com/flights
