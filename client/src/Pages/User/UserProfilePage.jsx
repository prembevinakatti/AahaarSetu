import React, { useState } from "react"
import Navbar from "@/components/Navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  User,
  Phone,
  MapPin,
  Hash,
  Calendar,
  Users,
  LocateFixed
} from "lucide-react"

const UserProfilePage = () => {

  const [location, setLocation] = useState("")

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`)
      },
      () => {
        alert("Unable to retrieve your location")
      }
    )
  }

  return (
    <>
      <Navbar />

      {/* Background */}
      <div className="min-h-screen pt-28 bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center relative overflow-hidden">

        {/* Soft Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:28px_28px] opacity-20" />

        {/* Amber Glow */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-amber-300/30 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-amber-400/20 blur-3xl rounded-full" />

        {/* Profile Card */}
        <Card className="relative z-10 w-full max-w-lg bg-white/85 backdrop-blur-xl border-none shadow-2xl">
          <CardContent className="p-8 space-y-6">

            {/* Header */}
            <div className="text-center space-y-2">
              <User className="w-12 h-12 mx-auto text-amber-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                User Profile
              </h2>
              <p className="text-sm text-gray-600">
                Complete your personal information
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">

              {/* Age */}
              <div>
                <Label>Age</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Contact */}
              <div>
                <Label>Contact Number</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="Enter contact number"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <Label>Gender</Label>
                <div className="relative mt-1">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <select className="w-full pl-10 pr-3 py-2 border rounded-md bg-white text-sm">
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              {/* Location with Current Location Icon */}
              <div>
                <Label>Location</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

                  <Input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 pr-10"
                  />

                  {/* Current Location Button */}
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="absolute right-3 top-2.5 text-amber-600 hover:text-amber-700"
                    title="Use current location"
                  >
                    <LocateFixed className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* User Generated ID */}
              {/* <div>
                <Label>User Generated ID</Label>
                <div className="relative mt-1">
                  <Hash className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Auto-generated ID"
                    className="pl-10"
                  />
                </div>
              </div> */}

            </div>

            {/* Save Button */}
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
              Save Profile
            </Button>

            {/* Footer */}
            <p className="text-xs text-center text-gray-500">
              This information helps us provide accurate food assistance during crises.
            </p>

          </CardContent>
        </Card>

      </div>
    </>
  )
}

export default UserProfilePage
