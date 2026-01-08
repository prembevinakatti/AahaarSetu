import React, { useState } from "react";
import Navbar from "@/components/Navbar";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, UtensilsCrossed, Clock, X } from "lucide-react";

/* ---------- UBER-STYLE PIN FACTORY ---------- */

const createPin = (color, pulse = false) =>
  new L.DivIcon({
    className: "",
    html: `
      <div style="position:relative;width:28px;height:38px;">
        ${
          pulse
            ? `
          <span style="
            position:absolute;
            width:40px;
            height:40px;
            top:-6px;
            left:-6px;
            border-radius:50%;
            background:${color};
            opacity:0.4;
            animation:pulse 1.6s infinite;
          "></span>`
            : ""
        }

        <div style="
          width:28px;
          height:28px;
          border-radius:50%;
          background:${color};
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 6px 14px rgba(0,0,0,0.25);
        ">
          <div style="
            width:8px;
            height:8px;
            background:white;
            border-radius:50%;
          "></div>
        </div>

        <div style="
          position:absolute;
          bottom:-10px;
          left:50%;
          transform:translateX(-50%);
          width:0;
          height:0;
          border-left:6px solid transparent;
          border-right:6px solid transparent;
          border-top:10px solid ${color};
        "></div>
      </div>

      <style>
        @keyframes pulse {
          0% { transform: scale(0.6); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      </style>
    `,
    iconSize: [28, 38],
    iconAnchor: [14, 38],
  });

/* ---------- ICONS ---------- */
const kitchenPin = createPin("#16a34a"); // green
const ngoPin = createPin("#f59e0b"); // amber
const urgentPin = createPin("#dc2626", true); // red + pulse

/* ---------- FOOD POINTS ---------- */
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
    lng: 77.75,
    type: "NGO",
    food: "Packed Meals",
    timing: "6 PM – 9 PM",
    quantity: "200 packets",
  },
  {
    id: 3,
    name: "Emergency Relief Point – KR Puram",
    lat: 12.9992,
    lng: 77.677,
    type: "URGENT",
    food: "Mixed Meals",
    timing: "Now",
    quantity: "Limited",
  },
];

const getPin = (type) => {
  if (type === "KITCHEN") return kitchenPin;
  if (type === "NGO") return ngoPin;
  if (type === "URGENT") return urgentPin;
};

/* ---------- COMPONENT ---------- */

const HomePage = () => {
  const [selected, setSelected] = useState(null);

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
              icon={getPin(point.type)}
              eventHandlers={{
                click: () => setSelected(point),
              }}
            />
          ))}
        </MapContainer>

        {/* SIDEBAR – ONLY WHEN CLICKED */}
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
  );
};

export default HomePage;
