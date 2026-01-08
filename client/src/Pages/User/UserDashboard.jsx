import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  UtensilsCrossed,
  Clock,
  Phone,
  User,
  Hash,
} from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-24 bg-gradient-to-br from-amber-50 via-white to-amber-100 px-6 md:px-12">
        {/* WELCOME */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-600">
            Welcome, Rahul 👋
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin size={16} /> KR Puram, Bengaluru
          </p>
        </div>

        {/* FOOD STATUS */}
        <Card className="mb-8 p-6 bg-white/95 backdrop-blur shadow-lg border-none">
          <div className="flex items-center gap-4 mb-4">
            <UtensilsCrossed className="text-amber-500" />
            <h2 className="text-xl font-semibold">Food Available Near You</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-gray-700">
            <div>
              <p className="text-sm">Nearest Food Point</p>
              <p className="font-bold">1.2 km away</p>
            </div>

            <div>
              <p className="text-sm">Status</p>
              <p className="font-bold text-green-600">Available</p>
            </div>

            <div>
              <p className="text-sm">Next Distribution</p>
              <p className="font-bold flex items-center gap-1">
                <Clock size={16} /> 12:30 PM
              </p>
            </div>
          </div>
        </Card>

        {/* QUICK ACTIONS */}
        {/* <div className="grid md:grid-cols-3 gap-4 mb-10">

          <Button
            className="bg-amber-500 hover:bg-amber-600 text-white"
            onClick={() => navigate("/map")}
          >
            <MapPin className="mr-2" />
            View Food Map
          </Button>

          <Button variant="outline">
            <UtensilsCrossed className="mr-2" />
            Request Assistance
          </Button>

          <Button variant="outline">
            <Phone className="mr-2" />
            Emergency Contact
          </Button>

        </div> */}

        {/* PROFILE INFO */}
        {/* PROFILE INFO */}
        <Card className="p-6 bg-white/95 backdrop-blur shadow-lg border-none">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <User className="text-amber-500" />
            <h2 className="text-xl font-semibold">Your Information</h2>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-3 gap-4 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Age & Gender</p>
              <p className="font-bold flex items-center gap-2">
                <User size={16} className="text-amber-500" />
                24 · Male
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-bold flex items-center gap-2">
                <Phone size={16} className="text-amber-500" />
                9998887776
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-bold flex items-center gap-2">
                <Hash size={16} className="text-amber-500" />
                USR-1029
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UserDashboard;
