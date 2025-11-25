import React from "react";
import { NavLink } from "react-router";
import errorImage from "../assets/errorphoto.png";

const ErrorPage = () => {
return ( <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-white to-red-900 p-4">


  {/* Image */}  
  <div className="mb-6 w-full max-w-md">  
    <img  
      src={errorImage}  
      alt="404 Error"  
      className="w-full h-auto rounded-lg shadow-lg object-contain"  
    />  
  </div>  

  {/* Button */}  
  <NavLink  
    to="/"  
    className="px-8 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 transition-all duration-500 transform hover:scale-105 hover:shadow-xl"  
  >  
    Go Home  
  </NavLink>  
</div>  


);
};

export default ErrorPage;
