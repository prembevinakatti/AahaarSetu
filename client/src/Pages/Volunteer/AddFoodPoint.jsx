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
import { UtensilsCrossed, LocateFixed, Clock } from "lucide-react";

const AddFoodPoint = () => {
  const [locating, setLocating] = useState(false);

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

  const handleGetLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        update(
          "location",
          data?.display_name ||
            `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
        );
        setLocating(false);
      },
      () => {
        alert("Unable to fetch location");
        setLocating(false);
      }
    );
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
              <label className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                className="h-11 w-62.5"
                placeholder="Community Kitchen – KR Puram"
              />
            </div>

            {/* FOOD TYPE */}
            <div>
              <label className="text-sm font-medium">Food Type</label>
              <Select defaultValue="Mixed">
                <SelectTrigger className="h-11 py-5 w-62.5">
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
              <label className="text-sm font-medium">
                From <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type="time"
                  className="h-11 w-62.5 pr-1"
                  onChange={(e) => updateTimings("from", e.target.value)}
                />
              </div>
            </div>

            {/* TO */}
            <div>
              <label className="text-sm font-medium">
                To <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type="time"
                  className="h-11 w-62.5 pr-1"
                  onChange={(e) => updateTimings("to", e.target.value)}
                />
              </div>
            </div>

            {/* ELIGIBILITY */}
            <div>
              <label className="text-sm font-medium">Eligibility</label>
              <Select defaultValue="Everyone">
                <SelectTrigger className="h-11 py-5 w-62.5">
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
              <Select defaultValue="AVAILABLE">
                <SelectTrigger className="h-11 py-5 w-62.5">
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
            <label className="text-sm font-medium">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                className="h-11 pr-10"
                placeholder="Use current location"
                onChange={(e) => update("location", e.target.value)}
              />
              <button
                onClick={handleGetLocation}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-700"
              >
                <LocateFixed size={18} />
              </button>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <label className="text-sm font-medium">
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <Textarea
              className="min-h-[96px]"
              placeholder="Free meals available for everyone"
            />
          </div>

          <Button className="w-full h-11 mt-8 bg-green-700 hover:bg-green-800">
            Add Food Point
          </Button>
        </Card>
      </div>
    </>
  );
};

export default AddFoodPoint;
