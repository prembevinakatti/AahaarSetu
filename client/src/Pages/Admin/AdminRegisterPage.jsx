import React, { useState } from "react";
import Navbar from "@/components/Navbar";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ShieldPlus,
  UserCheck,
  Building2,
  MapPin,
  LocateFixed,
  Loader2,
} from "lucide-react";
import axios from "axios";

const AdminRegisterPage = () => {
  const [location, setLocation] = useState("");
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationError, setLocationError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    orgName: "",
    orgNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setLocationError("Geolocation not supported");
      return;
    }

    setLocationStatus("loading");
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );

          const data = await response.json();
          const address = data.address || {};

          const area =
            address.suburb ||
            address.neighbourhood ||
            address.village ||
            address.town ||
            "";

          const city =
            address.city || address.county || address.state_district || "";

          const state = address.state || "";

          const formattedLocation = [area, city, state]
            .filter(Boolean)
            .join(", ");

          setLocation(formattedLocation);
          setLocationStatus("success");
        } catch (err) {
          setLocationStatus("error");
          setLocationError("Failed to detect location");
        }
      },
      () => {
        setLocationStatus("error");
        setLocationError("Permission denied");
      },
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      console.log({ formData, location: location });

      const response = await axios.post(
        `http://localhost:3000/api/user/admin/registerAdmin`,
        {
          ...formData,
          location: location,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      console.log(response.data);

      if (response.data.success) {
        setSubmitSuccess("Registration successful. Await admin verification.");
      }

      setFormData({
        username: "",
        email: "",
        orgName: "",
        orgNumber: "",
        password: "",
      });
      setLocation("");
    } catch (error) {
      console.log(error);
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoadingLocation = locationStatus === "loading";

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-28 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-400/25 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-slate-400/20 blur-3xl rounded-full" />

        <Card className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-xl border-none shadow-2xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <ShieldPlus className="w-12 h-12 mx-auto text-indigo-700" />
              <h2 className="text-2xl font-bold text-gray-900">
                Admin Registration
              </h2>
              <p className="text-sm text-gray-600">
                Register crisis management authorities
              </p>
            </div>

            <div className="space-y-4">
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="bg-white"
              />

              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Admin Email"
                className="bg-white"
              />

              <div className="relative">
                <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleChange}
                  placeholder="Organization Name"
                  className="bg-white pl-10"
                />
              </div>

              <div className="relative">
                <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  name="orgNumber"
                  value={formData.orgNumber}
                  onChange={handleChange}
                  placeholder="Organization Registration Number"
                  className="bg-white pl-10"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

                <Input
                  placeholder={
                    isLoadingLocation
                      ? "Detecting location..."
                      : "Area, City, State"
                  }
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={isLoadingLocation}
                  className="bg-white pl-10 pr-10"
                />

                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={isLoadingLocation}
                  className="absolute right-3 top-2.5 text-indigo-700 hover:text-indigo-800"
                >
                  {isLoadingLocation ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <LocateFixed className="w-5 h-5 cursor-pointer" />
                  )}
                </button>
              </div>

              <Input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Create Password"
                className="bg-white"
              />

              {submitError && (
                <p className="text-xs text-red-500">{submitError}</p>
              )}

              {submitSuccess && (
                <p className="text-xs text-green-600">{submitSuccess}</p>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-indigo-700 hover:bg-indigo-800 text-white flex gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <UserCheck size={18} />
              )}
              Register Admin
            </Button>

            <p className="text-xs text-center text-gray-500">
              Admin accounts require manual verification before activation.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminRegisterPage;
