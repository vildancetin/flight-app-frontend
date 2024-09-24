import { FaHotel, FaUmbrellaBeach, FaCar } from "react-icons/fa";
import carImg from '../assets/car.jpg';  
import hotelsImg from '../assets/hotels.jpg';  
import baggageImg from '../assets/baggage.jpg';
// Data to be used in RentCard
const infos = [
  { icon: <FaCar />, img: carImg, title: "car rentals" },
  { icon: <FaHotel />, img:  hotelsImg , title: "hotels" },
  { icon: <FaUmbrellaBeach />, img: baggageImg , title: "travel packages" },
];

export default infos