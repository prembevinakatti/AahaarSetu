import React, { useState } from "react"
import Navbar from "@/components/Navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  HandHeart,
  MapPin,
  LocateFixed,
  Building2,
  ToggleLeft
} from "lucide-react"

const VolunteerProfilePage = () => {
  const [location, setLocation] = useState("")
  const [availability, setAvailability] = useState("AVAILABLE")

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`)
      },
      () => alert("Unable to fetch location")
    )
  }

  return (
    <>
      <Navbar />

      {/* Background */}
      <div className="min-h-screen pt-28 bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center relative overflow-hidden">

        {/* Soft Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:30px_30px] opacity-20" />

        {/* Green Glow */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-300/30 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-amber-300/20 blur-3xl rounded-full" />

        {/* Profile Card */}
        <Card className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-xl border-none shadow-2xl">
          <CardContent className="p-8 space-y-6">

            {/* Header */}
            <div className="text-center space-y-2">
              <HandHeart className="w-12 h-12 mx-auto text-green-700" />
              <h2 className="text-2xl font-bold text-gray-900">
                Volunteer Profile
              </h2>
              <p className="text-sm text-gray-600">
                Update your availability and working area
              </p>
            </div>

            {/* Organization Name */}
            <div>
              <Label>Organization Name</Label>
              <div className="relative mt-1">
                <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Organization Name"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <Label>Location</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

                <Input
                  type="text"
                  placeholder="Current working area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 pr-10"
                />

                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="absolute right-3 top-2.5 text-green-700 hover:text-green-800"
                  title="Use current location"
                >
                  <LocateFixed className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Availability */}
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

            {/* Save Button */}
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Save Profile
            </Button>

            <p className="text-xs text-center text-gray-500">
              Keeping your profile updated helps efficient crisis coordination.
            </p>

          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default VolunteerProfilePage
