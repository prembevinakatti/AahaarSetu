import React, { useState } from "react"
import Navbar from "@/components/Navbar"
import {
  HandHeart,
  Mail,
  Phone,
  MapPin,
  Activity,
  CheckCircle
} from "lucide-react"
import { Switch } from "@/components/ui/switch"

const VolunteerDashboard = () => {
  const [available, setAvailable] = useState(true)

  return (
    <>
      <Navbar />

      {/* PAGE STARTS BELOW NAVBAR */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 pt-20">
        <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col gap-6">

          {/* WELCOME SECTION */}
          <section className="bg-white border-l-4 border-green-600 rounded-lg px-6 py-4 shadow-sm">
            <h1 className="text-2xl font-bold text-green-600">
              Welcome, Volunteer
            </h1>
            <p className="text-gray-600 mt-1">
              Service and availability control panel
            </p>
          </section>

          {/* MAIN CONTENT */}
          <section className="grid grid-cols-12 gap-6">

            {/* LEFT — VOLUNTEER INFO */}
            <div className="col-span-5 bg-white rounded-xl shadow-sm p-6 flex flex-col gap-5">

              <div className="flex items-center gap-2 text-gray-600">
                <HandHeart />
                <h2 className="text-lg font-semibold">
                  Volunteer Information
                </h2>
              </div>

              <InfoRow
                icon={<Mail />}
                label="Email Address"
                value="volunteer@mail.com"
              />

              <InfoRow
                icon={<Phone />}
                label="Phone Number"
                value="9876543210"
              />

              <InfoRow
                icon={<MapPin />}
                label="Current Location"
                value="Whitefield"
              />

              <InfoRow
                icon={<Activity />}
                label="Associated Organization"
                value="Helping Hands NGO"
              />

            </div>

            {/* RIGHT — SERVICE STATUS */}
            <div className="col-span-7 bg-white rounded-xl shadow-sm p-6 flex flex-col gap-6">

              <div className="flex items-center gap-2 text-gray-600">
                <Activity />
                <h2 className="text-lg font-semibold">
                  Service Status Overview
                </h2>
              </div>

              {/* STATUS GRID */}
              <div className="grid grid-cols-2 gap-x-10 gap-y-6">

                <StatusItem
                  label="Availability Status"
                  value={available ? "AVAILABLE" : "OFFLINE"}
                  highlight
                />

                <div>
                  <p className="text-sm text-gray-500">
                    Toggle Availability
                  </p>
                  <Switch
                    checked={available}
                    onCheckedChange={setAvailable}
                    className="mt-2"
                  />
                </div>

                <StatusItem
                  label="Verification Status"
                  value="Verified"
                  icon={<CheckCircle className="text-green-600" size={18} />}
                />

                <StatusItem
                  label="Total Distributions"
                  value="128"
                />

                <StatusItem
                  label="Last Active"
                  value="Today"
                />

              </div>

            </div>

          </section>

        </div>
      </div>
    </>
  )
}

/* ---------- HELPERS ---------- */

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-green-600 mt-0.5">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-green-600">{value}</p>
    </div>
  </div>
)

const StatusItem = ({ label, value, icon, highlight }) => (
  <div>
    <p className="text-sm text-gray-500 flex items-center gap-2">
      {icon} {label}
    </p>
    <p
      className={`text-xl font-bold ${
        highlight ? "text-green-600" : "text-green-600"
      }`}
    >
      {value}
    </p>
  </div>
)

export default VolunteerDashboard
