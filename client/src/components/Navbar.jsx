import React from "react";
import logo from "../assets/AahaarSetu.png";
import { Button } from "@/components/ui/button";
import { MapPin, UserPlus, ShieldAlert } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="AahaarSetu Logo"
            className="w-18 h-18 object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-green-700">
            AahaarSetu
          </span>
        </div>

        {/* Nav Links */}
        {/* <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#map" className="hover:text-green-600 transition">
            Food Map
          </a>
          <a href="#volunteer" className="hover:text-green-600 transition">
            Volunteer
          </a>
          <a href="#about" className="hover:text-green-600 transition">
            About
          </a>
        </div> */}

        {/* Actions */}
        {/* <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden md:flex gap-2">
            <UserPlus size={18} />
            Join
          </Button>

          <Button className="bg-red-600 hover:bg-red-700 gap-2 shadow-lg">
            <ShieldAlert size={18} />
            Crisis Mode
          </Button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
