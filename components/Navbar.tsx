import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="navbar fixed self-center">
      <Link href={"/"} className=" text-lg">
        DeskLite
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
      </div>
    </nav>
  );
};

export default Navbar;
