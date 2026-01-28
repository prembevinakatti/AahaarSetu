import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { UtensilsCrossed, LocateFixed, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFoodPoint = () => {
  const navigate = useNavigate();

  const [locating, setLocating] = useState(false);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    foodType: "Mixed",
    eligibility: "Everyone",
    stockStatus: "AVAILABLE",
    timings: {
      from: "",
      to: "",
    },
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const updateTimings = (key, value) =>
    setForm((prev) => ({
      ...prev,
      timings: { ...prev.timings, [key]: value },
    }));

  // 📍 Get current location
  const handleGetLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        );
        const data = await res.json();

        update("location", data.display_name);
        setCoords([longitude, latitude]); // GeoJSON order

        setLocating(false);
      },
      () => {
        alert("Unable to fetch location");
        setLocating(false);
      },
    );
  };

  // 🚀 Submit food point
  const handleSubmit = async () => {
    setError("");

    if (!coords) {
      return setError("Please fetch location using GPS");
    }

    if (!form.name || !form.timings.from || !form.timings.to) {
      return setError("Please fill all required fields");
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:3000/api/volunteer/verify/addFoodPoint",
        {
          data: {
            name: form.name,
            description: form.description,
            foodType: form.foodType,
            eligibility: form.eligibility,
            stockStatus: form.stockStatus,
            timings: form.timings,
            address: form.location,
            location: {
              coordinates: coords,
            },
          },
        },
        { withCredentials: true },
      );

      navigate("/VolunteerDashboard");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to add food point");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-24 px-6 bg-gradient-to-br from-white to-green-50">
        <Card className="max-w-4xl mx-auto p-8 bg-white shadow-lg border-none rounded-2xl">
          {/* HEADER */}
          <div className="flex items-center gap-3 mb-8">
            <UtensilsCrossed className="text-green-700" />
            <h1 className="text-2xl font-semibold text-green-700">
              Add Food Point
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* NAME */}
            <div>
              <label className="text-sm font-medium">Name *</label>
              <Input
                className="h-11"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Community Kitchen – KR Puram"
              />
            </div>

            {/* FOOD TYPE */}
            <div>
              <label className="text-sm font-medium">Food Type</label>
              <Select
                value={form.foodType}
                onValueChange={(v) => update("foodType", v)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="Vegan">Vegan</SelectItem>
                  <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* FROM */}
            <div>
              <label className="text-sm font-medium">From *</label>
              <Input
                type="time"
                className="h-11"
                onChange={(e) => updateTimings("from", e.target.value)}
              />
            </div>

            {/* TO */}
            <div>
              <label className="text-sm font-medium">To *</label>
              <Input
                type="time"
                className="h-11"
                onChange={(e) => updateTimings("to", e.target.value)}
              />
            </div>

            {/* ELIGIBILITY */}
            <div>
              <label className="text-sm font-medium">Eligibility</label>
              <Select
                value={form.eligibility}
                onValueChange={(v) => update("eligibility", v)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Everyone">Everyone</SelectItem>
                  <SelectItem value="Childrens">Childrens</SelectItem>
                  <SelectItem value="Elderly">Elderly</SelectItem>
                  <SelectItem value="Homeless">Homeless</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* STOCK */}
            <div>
              <label className="text-sm font-medium">Stock Status</label>
              <Select
                value={form.stockStatus}
                onValueChange={(v) => update("stockStatus", v)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AVAILABLE">Available</SelectItem>
                  <SelectItem value="LIMITED">Limited</SelectItem>
                  <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* LOCATION */}
          <div className="mt-6">
            <label className="text-sm font-medium">Location *</label>
            <div className="relative">
              <Input
                className="h-11 pr-10"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="Use current location"
                disabled={locating}
              />
              <button
                onClick={handleGetLocation}
                disabled={locating}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-700"
              >
                {locating ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <LocateFixed size={18} />
                )}
              </button>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              className="min-h-[96px]"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-11 mt-8 bg-green-700 hover:bg-green-800"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Add Food Point"}
          </Button>
        </Card>
      </div>
    </>
  );
};

export default AddFoodPoint;
