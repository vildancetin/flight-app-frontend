import React from "react";
import { IoAirplaneSharp } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import image from "../assets/joanne.jpeg"
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate=useNavigate()
  return (
    <div className="flex justify-between">
      <div className="flex justify-center items-center gap-1">
        <div className="bg-purple flex text-white h-5 w-5 rounded-full  justify-left items-center">
          <IoAirplaneSharp />
        </div>
        <span className="text-base font-bold tracking-wide">PLANE SCAPE</span>
      </div>
      <div className="flex gap-4 tags">
        <div className="flex justify-center items-center gap-1 hover:underline" onClick={()=>navigate("/myflights")}>
          <IoAirplaneSharp className="text-purple"/>
          <span className="font-medium">My Flights</span>
        </div>
        <div className="flex justify-center items-center gap-1 hover:underline">
          <FaTag className="text-purple"/>
          <span className="font-medium">Deals</span>
        </div>
        <div className="flex justify-center items-center gap-1 hover:underline">
          <BiWorld className="text-purple"/>
          <span className="font-medium">Discover</span>
        </div>
        <div className="flex justify-center items-center gap-1">
          <img src={image}alt="" className="w-8 h-8 rounded-full object-cover" />
          <span>Joane Smith</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
