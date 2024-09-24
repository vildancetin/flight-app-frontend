import React from "react";

// It gets and updates filteri Values
const FilterCard = ({filterValues,setFilterValues}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };
  return (
    <div className="w-full ">
      {/* Sorting By */}
      <div>
        <label htmlFor="sorting" className="block text-sm font-bold mb-2">
          Sort by:
        </label>
        <select
          name="sorting"
          id="sorting"
          value={filterValues.sortBy}
          onChange={handleChange}
          className="text-sm p-1 pl-2 rounded-md focus:outline-none w-full"
        >
          <option value="lowestPrice">Lowest Price</option>
          <option value="earliest">Earliest Departure</option>
          <option value="latest">Latest Departure</option>
        </select>
      </div>
      {/* Arrival Time */}
      <div className="mt-2">
        <span className="text-sm font-bold mb-4">Arrival Time</span>
        <fieldset className="text-xs font-medium flex flex-col gap-1 mt-2">
          <div className="flex">
            <input
              type="radio"
              name="arrival"
              id="before12"
              value="before12"
              checked={filterValues.arrival === "before12"}
              onChange={handleChange}
            />
            <label htmlFor="before12">5:00 AM - 11:59 AM</label>
          </div>
          <div className="flex ">
            <input
              type="radio"
              name="arrival"
              id="after12"
              value="after12"
              checked={filterValues.arrival === "after12"}
              onChange={handleChange}
            />
            <label htmlFor="after12">12:00 PM - 5:59 PM</label>
          </div>
        </fieldset>
      </div>
      {/* Stops */}
      <div className="mt-2">
        <span className="text-sm font-bold mb-4">Stops</span>
        <fieldset className="text-xs font-medium flex flex-col gap-1 mt-2">
          <div className="flex">
            <input
              type="radio"
              name="stops"
              id="nonstop"
              value="nonstop"
              checked={filterValues.stops === "nonstop"}
              onChange={handleChange}
            />
            <label htmlFor="nonstop" className="flex justify-between w-full">
              Nonstop <span>$230</span>
            </label>
          </div>
          <div className="flex ">
            <input
              type="radio"
              name="stops"
              id="onestop"
              value="onestop"
              checked={filterValues.stops === "onestop"}
              onChange={handleChange}
            />
            <label htmlFor="onestop" className="flex justify-between w-full">
              1 Stop <span>$230</span>
            </label>
          </div>
          <div className="flex ">
            <input
              type="radio"
              name="stops"
              id="twostop"
              value="twostop"
              checked={filterValues.stops === "twostop"}
              onChange={handleChange}
            />
            <label htmlFor="twostop" className="flex justify-between w-full">
              2+ Stop <span>$230</span>
            </label>
          </div>
        </fieldset>
      </div>
      {/* Airlines Included */}
      <div className="mt-2">
        <span className="text-sm font-bold mb-4">Airlines Included</span>
        <fieldset className="text-xs font-medium flex flex-col gap-1 mt-2">
          <div className="flex">
            <input
              type="radio"
              name="airlines"
              id="alitalia"
              value="alitalia"
              checked={filterValues.airlines==="alitalia"}
              onChange={handleChange}
            />
            <label htmlFor="alitalia" className="flex justify-between w-full">
              Alitalia <span>$230</span>
            </label>
          </div>
          <div className="flex ">
            <input
              type="radio"
              name="airlines"
              id="lufthansa"
              value="lufthansa"
              checked={filterValues.airlines==="lufthansa"}
              onChange={handleChange}
            />
            <label htmlFor="lufthansa" className="flex justify-between w-full">
              Lufthansa <span>$230</span>
            </label>
          </div>
          <div className="flex ">
            <input
              type="radio"
              name="airlines"
              id="airfrance"
              value="airfrance"
              checked={filterValues.airlines==="airfrance"}
              onChange={handleChange}
            />
            <label htmlFor="airfrance" className="flex justify-between w-full">
              Air France <span>$230</span>
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default FilterCard;
