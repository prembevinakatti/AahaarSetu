import React, { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  UserCheck,
  Mail,
  MapPin,
  Activity,
  CheckCircle,
  Clock,
  Users
} from "lucide-react"
import axios from "axios"

const ConnectedOrg = () => {
  const [pending, setPending] = useState([])
  const [connected, setConnected] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [pendingRes, allRes] = await Promise.all([
        axios.get(
          "http://localhost:3000/api/admin/verify/getVerificationRequests",
          { withCredentials: true }
        ),
        axios.get(
          "http://localhost:3000/api/admin/verify/getAllVerifications",
          { withCredentials: true }
        )
      ])

      setPending(pendingRes.data.requests)
      setConnected(
        allRes.data.verifications.filter(v => v.status === "APPROVED")
      )
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (volunteerId) => {
    await axios.put(
      "http://localhost:3000/api/admin/verify/acceptOrRejectVerification",
      { volunteerId, status: "APPROVED" },
      { withCredentials: true }
    )
    fetchData()
  }

  const handleReject = async (volunteerId) => {
    await axios.put(
      "http://localhost:3000/api/admin/verify/acceptOrRejectVerification",
      { volunteerId, status: "REJECTED" },
      { withCredentials: true }
    )
    fetchData()
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-indigo-600 font-semibold">Loading...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 pt-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">

          <section className="bg-white border-l-4 border-indigo-600 rounded-lg px-6 py-4 shadow-sm">
            <h1 className="text-2xl font-bold text-indigo-700">
              Admin Organization Control Panel
            </h1>
            <p className="text-gray-600">
              Volunteer verification system
            </p>
          </section>

          <section className="grid grid-cols-3 gap-6">
            <StatCard title="Pending Requests" value={pending.length} />
            <StatCard title="Connected Volunteers" value={connected.length} />
            <StatCard title="Total Volunteers" value={pending.length + connected.length} />
          </section>

          {/* PENDING */}
          <Section title="Pending Requests" icon={<Clock />}>
            {pending.map(v => (
              <VolunteerCard
                key={v._id}
                volunteer={v.volunteerId}
                admin={v.adminId}
                pending
                onApprove={() => handleApprove(v.volunteerId._id)}
                onReject={() => handleReject(v.volunteerId._id)}
              />
            ))}
          </Section>

          {/* CONNECTED */}
          <Section title="Connected Volunteers" icon={<CheckCircle />}>
            {connected.map(v => (
              <VolunteerCard
                key={v._id}
                volunteer={v.volunteerId}
                admin={v.adminId}
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

/* ---------------- UI ---------------- */

const Section = ({ title, icon, children }) => (
  <Card className="p-6">
    <div className="flex items-center gap-2 mb-4 text-indigo-700">
      {icon}
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    <div className="flex flex-col gap-4">{children}</div>
  </Card>
)

const VolunteerCard = ({ volunteer, admin, pending, connected, onApprove, onReject }) => (
  <div className="border rounded-lg p-4 flex justify-between items-center">
    <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">

      <Info label="Volunteer Name" value={volunteer.username} icon={<UserCheck />} />
      <Info label="Volunteer Email" value={volunteer.email} icon={<Mail />} />

      <Info label="Admin Org" value={admin.username} icon={<Activity />} />
      <Info label="Admin Email" value={admin.email} icon={<Mail />} />

    </div>

    {pending && (
      <div className="flex flex-col gap-2">
        <Button onClick={onApprove} className="bg-indigo-600 text-white">
          Approve
        </Button>
        <Button onClick={onReject} variant="outline" className="border-red-500 text-red-600">
          Reject
        </Button>
      </div>
    )}

    {connected && (
      <p className="text-green-600 font-bold text-sm">Connected</p>
    )}
  </div>
)

const Info = ({ label, value, icon }) => (
  <div className="flex gap-2 items-start">
    <div className="text-indigo-600 mt-0.5">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold">{value || "-"}</p>
    </div>
  </div>
)

const StatCard = ({ title, value }) => (
  <Card className="p-5 flex flex-col items-center justify-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-3xl font-bold text-indigo-700">{value}</p>
  </Card>
)
