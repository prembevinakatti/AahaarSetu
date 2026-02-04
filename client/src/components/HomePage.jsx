import React, { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"

import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  UtensilsCrossed,
  Clock,
  X,
  Car,
  Bike,
  Footprints
} from "lucide-react"
import axios from "axios"

/* ---------------- CONFIG ---------------- */
const ORS_KEY = "YOUR_OPENROUTESERVICE_KEY"

/* ---------- PIN FACTORY ---------- */
const createPin = (color, pulse = false) =>
  new L.DivIcon({
    className: "",
    html: `
      <div style="position:relative;width:28px;height:38px;">
        ${pulse ? `<span style="position:absolute;width:40px;height:40px;top:-6px;left:-6px;border-radius:50%;background:${color};opacity:0.4;animation:pulse 1.6s infinite;"></span>` : ""}
        <div style="width:28px;height:28px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;box-shadow:0 6px 14px rgba(0,0,0,0.25);">
          <div style="width:8px;height:8px;background:white;border-radius:50%;"></div>
        </div>
        <div style="position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);border-left:6px solid transparent;border-right:6px solid transparent;border-top:10px solid ${color};"></div>
      </div>
    `,
    iconSize: [28, 38],
    iconAnchor: [14, 38],
  })

const kitchenPin = createPin("#16a34a")
const urgentPin = createPin("#dc2626", true)

const getPin = (status) => {
  if (status === "LIMITED") return urgentPin
  return kitchenPin
}

/* ---------- HELPERS ---------- */
const formatTime = (t) => {
  if (!t) return "-"
  const [h, m] = t.split(":")
  const hour = Number(h)
  const suffix = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 || 12
  return `${hour12}:${m} ${suffix}`
}

/* ---------- COMPONENT ---------- */

const HomePage = () => {
  const [foodPoints, setFoodPoints] = useState([])
  const [selected, setSelected] = useState(null)
  const [userLocation, setUserLocation] = useState([12.9716, 77.5946])

  const [routeCoords, setRouteCoords] = useState([])
  const [routeInfo, setRouteInfo] = useState(null)
  const [mode, setMode] = useState("driving-car")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude
      setUserLocation([lat, lng])

      const res = await axios.get(
        `http://localhost:3000/api/volunteer/food/getNearbyFoodPoints?latitude=${lat}&longitude=${lng}&maxDistance=10`,
        { withCredentials: true }
      )

      setFoodPoints(res.data.foodPoints)
    })
  }, [])

  

  

  /* -------- FETCH ROUTE -------- */
  const fetchRoute = async (fp, travelMode) => {
    const [lat, lng] = userLocation
    const [fpLng, fpLat] = fp.location.coordinates

    const res = await axios.post(
      `https://api.openrouteservice.org/v2/directions/${travelMode}`,
      {
        coordinates: [
          [lng, lat],
          [fpLng, fpLat],
        ],
      },
      {
        headers: {
          Authorization: ORS_KEY,
          "Content-Type": "application/json",
        },
      }
    )

    const geometry = res.data.routes[0].geometry.coordinates
    const summary = res.data.routes[0].summary

    // convert to leaflet format
    const leafletCoords = geometry.map(([lng, lat]) => [lat, lng])

    setRouteCoords(leafletCoords)
    setRouteInfo(summary)
    setMode(travelMode)
  }

  return (
    <>
      <Navbar />

      <div className="pt-20 h-screen relative">
        <MapContainer center={userLocation} zoom={13} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* USER MARKER */}
          <Marker position={userLocation} />

          {/* FOOD POINTS */}
          {foodPoints.map((fp) => (
            <Marker
              key={fp._id}
              position={[
                fp.location.coordinates[1],
                fp.location.coordinates[0],
              ]}
              icon={getPin(fp.stockStatus)}
              eventHandlers={{
                click: () => {
                  setSelected(fp)
                  fetchRoute(fp, "driving-car")
                },
              }}
            />
          ))}

          {/* ROUTE LINE */}
          {routeCoords.length > 0 && (
            <Polyline positions={routeCoords} color="#16a34a" weight={5} />
          )}
        </MapContainer>

        {/* SIDEBAR */}
        {selected && (
          <div className="absolute top-20 right-0 w-full md:w-96 h-[calc(100%-5rem)] bg-white shadow-2xl z-[1000]">
            <Card className="h-full border-none rounded-none">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-green-700 flex items-center gap-2">
                    <MapPin /> {selected.name}
                  </h2>
                  <button onClick={() => {
                    setSelected(null)
                    setRouteCoords([])
                  }}>
                    <X />
                  </button>
                </div>

                <p>{selected.description}</p>

                <div className="flex items-center gap-2">
                  <UtensilsCrossed />
                  {selected.foodType}
                </div>

                <div className="flex items-center gap-2">
                  <Clock />
                  {formatTime(selected.timings?.from)} –{" "}
                  {formatTime(selected.timings?.to)}
                </div>

                {/* ROUTE INFO */}
                {routeInfo && (
                  <div className="bg-green-50 p-3 rounded-lg space-y-2 text-sm">
                    <p>
                      Distance:{" "}
                      <strong>
                        {(routeInfo.distance / 1000).toFixed(2)} km
                      </strong>
                    </p>
                    <p>
                      ETA:{" "}
                      <strong>
                        {Math.round(routeInfo.duration / 60)} mins
                      </strong>
                    </p>
                  </div>
                )}

                {/* MODE SWITCH */}
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={mode === "driving-car" ? "default" : "outline"}
                    onClick={() => fetchRoute(selected, "driving-car")}
                  >
                    <Car />
                  </Button>

                  <Button
                    variant={mode === "foot-walking" ? "default" : "outline"}
                    onClick={() => fetchRoute(selected, "foot-walking")}
                  >
                    <Footprints />
                  </Button>

                  <Button
                    variant={mode === "cycling-regular" ? "default" : "outline"}
                    onClick={() => fetchRoute(selected, "cycling-regular")}
                  >
                    <Bike />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}

export default HomePage
