import React, { useState } from "react";
import Navbar from "@/components/Navbar";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  HandHeart,
  MapPin,
  LocateFixed,
  Building2,
  ToggleLeft,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VolunteerProfilePage = () => {
  const navigate = useNavigate();

  const [orgName, setOrgName] = useState("");
  const [currentArea, setCurrentArea] = useState("");
  const [availability, setAvailability] = useState("AVAILABLE");

  const [loading, setLoading] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setIsFetchingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await res.json();
          const address = data.address || {};

          const area =
            address.suburb ||
            address.neighbourhood ||
            address.village ||
            address.town ||
            "";

          const city = address.city || address.county || "";
          const state = address.state || "";

          setCurrentArea([area, city, state].filter(Boolean).join(", "));
        } catch (err) {
          alert("Failed to fetch location");
        } finally {
          setIsFetchingLocation(false);
        }
      },
      () => {
        alert("Unable to fetch location");
        setIsFetchingLocation(false);
      }
    );
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/volunteer/profile/createVolunteerProfile",
        {
          orgName,
          currentArea,
          availabilityStatus: availability,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setSuccess("Profile saved successfully");
        setTimeout(() => navigate("/volunteer/dashboard"), 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-28 bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center relative overflow-hidden">
        <Card className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-xl border-none shadow-2xl">
          <CardContent className="p-8 space-y-6">

            <div className="text-center space-y-2">
              <HandHeart className="w-12 h-12 mx-auto text-green-700" />
              <h2 className="text-2xl font-bold text-gray-900">
                Volunteer Profile
              </h2>
              <p className="text-sm text-gray-600">
                Update your availability and working area
              </p>
            </div>

            <div>
              <Label>Organization Name</Label>
              <div className="relative mt-1">
                <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Organization Name"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label>Location</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  value={currentArea}
                  onChange={(e) => setCurrentArea(e.target.value)}
                  placeholder={
                    isFetchingLocation
                      ? "Detecting location..."
                      : "Current working area"
                  }
                  disabled={isFetchingLocation}
                  className="pl-10 pr-10"
                />

                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isFetchingLocation}
                  className="absolute right-3 top-2.5 text-green-700 disabled:opacity-50"
                >
                  {isFetchingLocation ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <LocateFixed className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Label>Availability Status</Label>
              <div className="relative mt-1">
                <ToggleLeft className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-md bg-white text-sm"
                >
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="OFFLINE">OFFLINE</option>
                </select>
              </div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}
            {success && <p className="text-xs text-green-600">{success}</p>}

            <Button
              onClick={handleSaveProfile}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save Profile"
              )}
            </Button>

          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default VolunteerProfilePage;
