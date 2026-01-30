import React, { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Activity,
  CheckCircle,
  Clock,
  Users
} from "lucide-react"
import axios from "axios"

const ConnectedOrg = () => {
  const [pendingVolunteers, setPendingVolunteers] = useState([])
  const [connectedVolunteers, setConnectedVolunteers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/admin/volunteers",
        { withCredentials: true }
      )

      setPendingVolunteers(res.data.pending)
      setConnectedVolunteers(res.data.connected)
    } catch (err) {
      console.error("Failed to fetch volunteers")
    } finally {
      setLoading(false)
    }
  }

  const approveVolunteer = async (volunteerId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/admin/verify/approve",
        { volunteerId },
        { withCredentials: true }
      )
      fetchVolunteers()
    } catch {
      alert("Failed to approve volunteer")
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 pt-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">

          {/* HEADER */}
          <section className="bg-white border-l-4 border-indigo-600 rounded-lg px-6 py-4 shadow-sm">
            <h1 className="text-2xl font-bold text-indigo-700">
              Admin Organization Control Panel
            </h1>
            <p className="text-gray-600">
              Verify volunteers & manage connected workforce
            </p>
          </section>

          {/* STATS */}
          <section className="grid grid-cols-3 gap-6">
            <StatCard title="Pending Requests" value={pendingVolunteers.length} />
            <StatCard title="Connected Volunteers" value={connectedVolunteers.length} />
            <StatCard title="Total Workforce" value={pendingVolunteers.length + connectedVolunteers.length} />
          </section>

          {/* PENDING REQUESTS */}
          <Section title="Pending Verification Requests" icon={<Clock />}>
            {pendingVolunteers.length === 0 && (
              <Empty text="No pending requests" />
            )}

            {pendingVolunteers.map(v => (
              <VolunteerCard
                key={v._id}
                volunteer={v}
                action={() => approveVolunteer(v._id)}
                actionLabel="Approve & Connect"
                highlight
              />
            ))}
          </Section>

          {/* CONNECTED */}
          <Section title="Connected Volunteers" icon={<CheckCircle />}>
            {connectedVolunteers.length === 0 && (
              <Empty text="No connected volunteers" />
            )}

            {connectedVolunteers.map(v => (
              <VolunteerCard
                key={v._id}
                volunteer={v}
                connected
              />
            ))}
          </Section>

        </div>
      </div>
    </>
  )
}

export default ConnectedOrg

/* ================= COMPONENTS ================= */

const Section = ({ title, icon, children }) => (
  <Card className="p-6">
    <div className="flex items-center gap-2 mb-4 text-indigo-700">
      {icon}
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    <div className="flex flex-col gap-4">
      {children}
    </div>
  </Card>
)

const VolunteerCard = ({ volunteer, action, actionLabel, connected, highlight }) => {
  const profile = volunteer.volunteerProfile

  return (
    <div
      className={`border rounded-lg p-4 flex justify-between items-center ${
        highlight ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
      }`}
    >
      <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">

        <Info label="Name" value={volunteer.username} icon={<UserCheck />} />
        <Info label="Email" value={volunteer.email} icon={<Mail />} />
        <Info label="Phone" value={volunteer.phoneNumber} icon={<Phone />} />
        <Info label="Location" value={profile.currentArea} icon={<MapPin />} />
        <Info label="Organization" value={profile.orgName} icon={<Activity />} />
        <Info label="Volunteer ID" value={profile.volunteerId} icon={<Users />} />

      </div>

      {!connected && (
        <Button
          onClick={action}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {actionLabel}
        </Button>
      )}

      {connected && (
        <p className="text-green-600 font-bold text-sm">
          Connected
        </p>
      )}
    </div>
  )
}

const Info = ({ label, value, icon }) => (
  <div className="flex gap-2 items-start">
    <div className="text-indigo-600 mt-0.5">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800">{value || "-"}</p>
    </div>
  </div>
)

const StatCard = ({ title, value }) => (
  <Card className="p-5 flex flex-col items-center justify-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-3xl font-bold text-indigo-700">{value}</p>
  </Card>
)

const Empty = ({ text }) => (
  <p className="text-sm text-gray-500">{text}</p>
)
