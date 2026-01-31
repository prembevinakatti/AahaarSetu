import React, { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Activity,
  CheckCircle,
  Clock,
  Building2,
  Hash,
  Users,
  Shield
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import axios from "axios"

const VolunteerDashboard = () => {
  const [profile, setProfile] = useState(null)
  const [available, setAvailable] = useState(true)
  const [loadingStatus, setLoadingStatus] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/volunteer/profile/getVolunteerProfile",
        { withCredentials: true }
      )

      const data = res.data.volunteerProfile
      setProfile(data)
      setAvailable(data.availabilityStatus === "AVAILABLE")
    }

    fetchProfile()
  }, [])

  const handleAvailabilityToggle = async (value) => {
    setAvailable(value)
    setLoadingStatus(true)

    try {
      await axios.patch(
        "http://localhost:3000/api/user/volunteer/update-status",
        { availabilityStatus: value ? "AVAILABLE" : "OFFLINE" },
        { withCredentials: true }
      )
    } finally {
      setLoadingStatus(false)
    }
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-green-600 font-semibold">Loading dashboard...</p>
        </div>
      </>
    )
  }

  const volunteer = profile.volunteer
  const org = profile.associatedOrganization

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 pt-20">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col gap-6">

          {/* HEADER */}
          <section className="bg-white border-l-4 border-green-600 rounded-lg px-6 py-4 shadow-sm">
            <h1 className="text-2xl font-bold text-green-700">
              Volunteer Dashboard
            </h1>
            <p className="text-gray-600">
              Volunteer ID: <span className="font-semibold">{profile.volunteerId}</span>
            </p>
          </section>

          <section className="grid grid-cols-12 gap-6">

            {/* VOLUNTEER IDENTITY */}
            <CardSection title="Volunteer Identity" icon={<User />} col="col-span-4">
              <InfoRow icon={<User />} label="Username" value={volunteer.username} />
              <InfoRow icon={<Mail />} label="Email" value={volunteer.email} />
            </CardSection>

            {/* VOLUNTEER SERVICE */}
            <CardSection title="Service Information" icon={<Activity />} col="col-span-4">
              <InfoRow icon={<Building2 />} label="Volunteer Org" value={profile.orgName} />
              <InfoRow icon={<MapPin />} label="Working Area" value={profile.currentArea} />
              <InfoRow icon={<Users />} label="Distributions" value={profile.totalDistributions} />

              <div className="mt-4">
                <p className="text-sm text-gray-500">Availability</p>
                <div className="flex items-center gap-4 mt-1">
                  <p className="font-bold text-green-700">
                    {available ? "AVAILABLE" : "OFFLINE"}
                  </p>
                  <Switch
                    checked={available}
                    disabled={loadingStatus}
                    onCheckedChange={handleAvailabilityToggle}
                  />
                </div>
              </div>

              <div className="mt-3">
                <p className="text-sm text-gray-500">Verification</p>
                <div className="flex items-center gap-2 mt-1">
                  {profile.isVerified ? (
                    <>
                      <CheckCircle className="text-green-600" size={18} />
                      <p className="font-bold text-green-700">Verified</p>
                    </>
                  ) : (
                    <>
                      <Clock className="text-yellow-500" size={18} />
                      <p className="font-bold text-yellow-600">Pending</p>
                    </>
                  )}
                </div>
              </div>
            </CardSection>

            {/* ASSOCIATED ORGANIZATION */}
            <CardSection title="Associated Organization (Admin/NGO)" icon={<Shield />} col="col-span-4">
              <InfoRow icon={<Building2 />} label="Organization Name" value={org.orgName} />
              <InfoRow icon={<Hash />} label="Org Number" value={org.orgNumber} />
              <InfoRow icon={<Mail />} label="Admin Email" value={org.email} />
              <InfoRow icon={<MapPin />} label="Location" value={org.location} />
              <InfoRow icon={<User />} label="Admin Username" value={org.username} />

              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700 font-semibold">
                  Officially Connected Organization
                </p>
                <p className="text-xs text-gray-600">
                  This NGO is responsible for verifying and coordinating your activities.
                </p>
              </div>
            </CardSection>

          </section>
        </div>
      </div>
    </>
  )
}

/* ---------------- UI HELPERS ---------------- */

const CardSection = ({ title, icon, col, children }) => (
  <div className={`${col} bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4`}>
    <div className="flex items-center gap-2 text-green-700">
      {icon}
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    {children}
  </div>
)

const InfoRow = ({ icon, label, value }) => (
  <div className="flex gap-3 items-start">
    <div className="text-green-600 mt-0.5">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-green-700">{value || "-"}</p>
    </div>
  </div>
)

export default VolunteerDashboard
