import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row gap-4 md:gap-0 justify-center items-center ">
      <p>Looks like you wandered off the multiverse...</p>
      <img src="/spidoman.jpg" alt="" className="w-120 " />
    </div>
  );
};

export default NotFound;
