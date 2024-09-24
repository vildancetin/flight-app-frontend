import React from 'react'
// It contains data and price information
const BookFlightCard = ({data}) => {
  return (
    <div className={`h-28 lg:w-24 md:w-16 sm:w-8 rounded-md flex flex-col gap-3 p-6 border border-gray justify-center items-center ${!data ? "bg-gray" : ""}`}>
        <span className={`font-semibold text-2xl ${!data && "text-dark_gray"}` }>{data ? `$${data.price}` : "---"}</span>
        <span className='text-xs text-dark_gray'>{data?.title}</span>
    </div>
  )
}

export default BookFlightCard