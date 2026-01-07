import React, { useState } from "react"
import Navbar from "@/components/Navbar"

import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, UtensilsCrossed, Clock, X } from "lucide-react"

/* ---------- CUSTOM ICONS ---------- */

// Community Kitchen
const kitchenIcon = new L.DivIcon({
  html: `<div class="w-4 h-4 bg-green-600 rounded-full border-4 border-green-300"></div>`,
  className: "",
})

// Packed Food / NGO
const ngoIcon = new L.DivIcon({
  html: `<div class="w-4 h-4 bg-amber-500 rotate-45"></div>`,
  className: "",
})

// Urgent / Limited
const urgentIcon = new L.DivIcon({
  html: `
    <div class="relative">
      <div class="absolute animate-ping w-6 h-6 bg-red-400 rounded-full opacity-75"></div>
      <div class="w-4 h-4 bg-red-600 rounded-full"></div>
    </div>
  `,
  className: "",
})

/* ---------- SAMPLE FOOD POINTS ---------- */
const foodPoints = [
  {
    id: 1,
    name: "Community Kitchen – MG Road",
    lat: 12.9716,
    lng: 77.5946,
    type: "KITCHEN",
    food: "Rice & Dal",
    timing: "12 PM – 3 PM",
    quantity: "150 plates",
  },
  {
    id: 2,
    name: "NGO Packed Meals – Whitefield",
    lat: 12.9698,
    lng: 77.7500,
    type: "NGO",
    food: "Packed Meals",
    timing: "6 PM – 9 PM",
    quantity: "200 packets",
  },
  {
    id: 3,
    name: "Emergency Relief Point – KR Puram",
    lat: 12.9992,
    lng: 77.6770,
    type: "URGENT",
    food: "Mixed Meals",
    timing: "Now",
    quantity: "Limited",
  },
]

const getIcon = (type) => {
  if (type === "KITCHEN") return kitchenIcon
  if (type === "NGO") return ngoIcon
  if (type === "URGENT") return urgentIcon
}

/* ---------- COMPONENT ---------- */

const HomePage = () => {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <Navbar />

      <div className="pt-20 h-screen relative">

        {/* MAP */}
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
              icon={getIcon(point.type)}
              eventHandlers={{
                click: () => setSelected(point),
              }}
            />
          ))}
        </MapContainer>

        {/* SLIDE-IN SIDEBAR */}
        {selected && (
          <div className="absolute top-20 right-0 w-full md:w-96 h-[calc(100%-5rem)] bg-white/95 backdrop-blur-lg shadow-2xl z-[1000] animate-in slide-in-from-right">

            <Card className="h-full border-none rounded-none">
              <CardContent className="p-6 space-y-4">

                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-amber-600 flex items-center gap-2">
                    <MapPin /> {selected.name}
                  </h2>
                  <button onClick={() => setSelected(null)}>
                    <X />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <UtensilsCrossed />
                  <span>{selected.food}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock />
                  <span>{selected.timing}</span>
                </div>

                <p className="text-gray-700">
                  Quantity: <strong>{selected.quantity}</strong>
                </p>

                <Button className="w-full bg-amber-500 hover:bg-amber-600">
                  Get Directions
                </Button>

              </CardContent>
            </Card>

          </div>
        )}

      </div>
    </>
  )
}

export default HomePage
