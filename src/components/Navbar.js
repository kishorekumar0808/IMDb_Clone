import React from "react";
import { Link } from "react-router-dom";
import IMDBLogo from "../assets/IMDBLogo.png";

const Navbar = () => {
  return (
    <div className="flex border space-x-8 items-center pl-3 py-4">
      <img src={IMDBLogo} className="w-[100px]" />
      {/* Using <Link /> here instead of <a /> to harness the power of react's client side rendering */}
      <Link to="/" className="font-bold">
        Movies
      </Link>
      <Link to="/watchList" className="font-bold">
        WatchList
      </Link>
    </div>
  );
};

export default Navbar;
