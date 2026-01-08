import React from "react"
import Navbar from "@/components/Navbar"
import {
  Shield,
  Mail,
  Building2,
  MapPin,
  Users,
  UserCheck
} from "lucide-react"

const AdminDashboard = () => {
  return (
    <>
      <Navbar />

      {/* MAIN PAGE (STARTS BELOW NAVBAR) */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 pt-20">

        <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col gap-6">

          {/* ✅ WELCOME SECTION (NOW VISIBLE) */}
          <section className="bg-white border-l-4 border-indigo-700 rounded-lg px-6 py-4 shadow-sm">
            <h1 className="text-2xl font-bold text-indigo-700">
              Welcome, Admin
            </h1>
            <p className="text-gray-600 mt-1">
              Organization-level crisis coordination panel
            </p>
          </section>

          {/* MAIN CONTENT */}
          <section className="grid grid-cols-12 gap-6">

            {/* LEFT — ADMIN DETAILS */}
            <div className="col-span-5 bg-white rounded-xl shadow-sm p-6 flex flex-col gap-5">

              <div className="flex items-center gap-2 text-indigo-700">
                <Shield />
                <h2 className="text-lg font-semibold">
                  Admin Information
                </h2>
              </div>

              <InfoRow
                icon={<UserCheck />}
                label="Admin Username"
                value="admin_aahaar"
              />

              <InfoRow
                icon={<Mail />}
                label="Email Address"
                value="admin@ngo.org"
              />

              <InfoRow
                icon={<Building2 />}
                label="Organization Name"
                value="Helping Hands NGO"
              />

              <InfoRow
                icon={<MapPin />}
                label="Location"
                value="Bengaluru"
              />
            </div>

            {/* RIGHT — VOLUNTEER OVERVIEW */}
            <div className="col-span-7 bg-white rounded-xl shadow-sm p-6 flex flex-col gap-6">

              <div className="flex items-center gap-2 text-indigo-700">
                <Users />
                <h2 className="text-lg font-semibold">
                  Volunteer Network Overview
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-10 gap-y-6">

                <StatItem label="Total Volunteers Connected" value="42" />
                <StatItem label="Active Volunteers" value="36" />
                <StatItem label="Pending Verifications" value="6" />
                <StatItem label="Operational Areas Covered" value="8 Zones" />

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
    <div className="text-indigo-700 mt-0.5">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  </div>
)

const StatItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold text-indigo-700">{value}</p>
  </div>
)

export default AdminDashboard
