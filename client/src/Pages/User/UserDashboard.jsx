import React from "react"
import Navbar from "@/components/Navbar"
import {
  User,
  Phone,
  MapPin,
  UtensilsCrossed,
  Clock,
  Hash
} from "lucide-react"

const UserDashboard = () => {
  return (
    <>
      <Navbar />

      {/* PAGE BELOW NAVBAR */}
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 pt-20">
        <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col gap-6">

          {/* WELCOME SECTION */}
          <section className="bg-white border-l-4 border-amber-500 rounded-lg px-6 py-4 shadow-sm">
            <h1 className="text-2xl font-bold text-amber-600">
              Welcome, Rahul 👋
            </h1>
            <p className="text-gray-600 mt-1 flex items-center gap-1">
              <MapPin size={14} /> KR Puram, Bengaluru
            </p>
          </section>

          {/* MAIN CONTENT */}
          <section className="grid grid-cols-12 gap-6">

            {/* LEFT — USER INFORMATION */}
            <div className="col-span-5 bg-white rounded-xl shadow-sm p-6 flex flex-col gap-5">

              <div className="flex items-center gap-2 text-amber-600">
                <User />
                <h2 className="text-lg font-semibold">
                  User Information
                </h2>
              </div>

              <InfoRow
                icon={<User />}
                label="Age & Gender"
                value="24 · Male"
              />

              <InfoRow
                icon={<Phone />}
                label="Contact Number"
                value="9998887776"
              />

              <InfoRow
                icon={<Hash />}
                label="User ID"
                value="USR-1029"
              />

            </div>

            {/* RIGHT — FOOD STATUS */}
            <div className="col-span-7 bg-white rounded-xl shadow-sm p-6 flex flex-col gap-6">

              <div className="flex items-center gap-2 text-amber-600">
                <UtensilsCrossed />
                <h2 className="text-lg font-semibold">
                  Food Availability Near You
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-10 gap-y-6">

                <StatusItem
                  label="Nearest Food Point"
                  value="1.2 km away"
                />

                <StatusItem
                  label="Current Status"
                  value="Available"
                  highlight
                />

                <StatusItem
                  label="Next Distribution Time"
                  value="12:30 PM"
                  icon={<Clock size={16} />}
                />

                <StatusItem
                  label="Food Source"
                  value="Community Kitchen"
                />

              </div>

            </div>

          </section>

        </div>
      </div>
    </>
  )
}

/* ---------- HELPER COMPONENTS ---------- */

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-amber-500 mt-0.5">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
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
        highlight ? "text-grren-600" : "text-gray-900"
      }`}
    >
      {value}
    </p>
  </div>
)

export default UserDashboard
