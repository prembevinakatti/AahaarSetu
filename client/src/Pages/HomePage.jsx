import React, { useState } from "react"
import Navbar from "@/components/Navbar"

import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, UtensilsCrossed, Clock } from "lucide-react"

// Dummy food points (replace with backend data later)
const foodPoints = [
  {
    id: 1,
    name: "Community Kitchen – MG Road",
    lat: 12.9716,
    lng: 77.5946,
    foodType: "Rice & Dal",
    timing: "12 PM – 3 PM",
    quantity: "150 plates",
    verified: true,
  },
  {
    id: 2,
    name: "NGO Food Camp – Whitefield",
    lat: 12.9698,
    lng: 77.7500,
    foodType: "Packed Meals",
    timing: "6 PM – 9 PM",
    quantity: "200 packets",
    verified: true,
  },
]

const HomePage = () => {
  const [selectedFoodPoint, setSelectedFoodPoint] = useState(null)

  return (
    <>
      <Navbar />

      <div className="pt-20 h-screen flex bg-gradient-to-br from-amber-50 via-white to-green-50">

        {/* MAP SECTION */}
        <div className="w-full md:w-3/4 h-full">
          <MapContainer
            center={[12.9716, 77.5946]}
            zoom={12}
            className="h-full w-full"
          >
            <TileLayer
              attribution="© OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {foodPoints.map((point) => (
              <Marker
                key={point.id}
                position={[point.lat, point.lng]}
                eventHandlers={{
                  click: () => setSelectedFoodPoint(point),
                }}
              />
            ))}
          </MapContainer>
        </div>

        {/* SIDEBAR */}
        <div
          className={`w-full md:w-1/4 bg-white/90 backdrop-blur-lg border-l shadow-xl transition-all duration-300 ${
            selectedFoodPoint ? "translate-x-0" : "translate-x-full md:translate-x-0"
          }`}
        >
          {selectedFoodPoint ? (
            <Card className="h-full border-none rounded-none">
              <CardContent className="p-6 space-y-4">

                <div className="flex items-center gap-2 text-amber-600">
                  <MapPin />
                  <h2 className="text-lg font-bold">
                    {selectedFoodPoint.name}
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <UtensilsCrossed />
                  <span>Food: {selectedFoodPoint.foodType}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <Clock />
                  <span>Timing: {selectedFoodPoint.timing}</span>
                </div>

                <p className="text-gray-600">
                  Available Quantity:{" "}
                  <span className="font-semibold">
                    {selectedFoodPoint.quantity}
                  </span>
                </p>

                <Button className="w-full bg-amber-500 hover:bg-amber-600">
                  Get Directions
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedFoodPoint(null)}
                >
                  Close
                </Button>

              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
              Click a food point on the map
            </div>
          )}
        </div>

      </div>
    </>
  )
}

export default HomePage
