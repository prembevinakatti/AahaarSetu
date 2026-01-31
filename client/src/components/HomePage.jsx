import React, { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"

import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, UtensilsCrossed, Clock, X, Car, Bike, Footprints } from "lucide-react"
import axios from "axios"

/* ------------------ CONFIG ------------------ */
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
  const [routes, setRoutes] = useState(null)

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

  const getRoutes = async (fp) => {
    const [lat, lng] = userLocation
    const [fpLng, fpLat] = fp.location.coordinates

    const modes = ["driving-car", "foot-walking", "cycling-regular"]

    const results = await Promise.all(
      modes.map(mode =>
        axios.post(
          `https://api.openrouteservice.org/v2/directions/${mode}`,
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
      )
    )

    setRoutes({
      drive: results[0].data.routes[0].summary,
      walk: results[1].data.routes[0].summary,
      bike: results[2].data.routes[0].summary,
    })
  }

  const openGoogleMaps = () => {
    const [lat, lng] = userLocation
    const [fpLng, fpLat] = selected.location.coordinates
    window.open(
      `https://www.google.com/maps/dir/${lat},${lng}/${fpLat},${fpLng}`,
      "_blank"
    )
  }

  return (
    <>
      <Navbar />

      <div className="pt-20 h-screen relative">
        <MapContainer center={userLocation} zoom={13} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {foodPoints.map((fp) => (
            <Marker
              key={fp._id}
              position={[fp.location.coordinates[1], fp.location.coordinates[0]]}
              icon={getPin(fp.stockStatus)}
              eventHandlers={{
                click: () => {
                  setSelected(fp)
                  getRoutes(fp)
                },
              }}
            />
          ))}
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
                  <button onClick={() => setSelected(null)}>
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
                  {formatTime(selected.timings?.from)} – {formatTime(selected.timings?.to)}
                </div>

                {routes && (
                  <div className="space-y-2 text-sm">
                    <RouteRow icon={<Car />} label="Drive" data={routes.drive} />
                    <RouteRow icon={<Footprints />} label="Walk" data={routes.walk} />
                    <RouteRow icon={<Bike />} label="Bike" data={routes.bike} />
                  </div>
                )}

                <Button onClick={openGoogleMaps} className="w-full bg-green-600">
                  Open in Google Maps
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

/* ---------- ROUTE ROW ---------- */
const RouteRow = ({ icon, label, data }) => (
  <div className="flex items-center gap-3">
    {icon}
    <span className="font-medium">{label}:</span>
    <span>{(data.distance / 1000).toFixed(1)} km</span>
    <span>{Math.round(data.duration / 60)} mins</span>
  </div>
)
