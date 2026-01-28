import React, { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import {
  HandHeart,
  Mail,
  Phone,
  MapPin,
  Activity,
  CheckCircle,
  Clock
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import axios from "axios"

const VolunteerDashboard = () => {
  const [available, setAvailable] = useState(true)
  const [loadingStatus, setLoadingStatus] = useState(false)

  const [volunteer, setVolunteer] = useState(null)
  const [profile, setProfile] = useState(null)

  const [verificationStatus, setVerificationStatus] = useState("UNVERIFIED")
  const [requesting, setRequesting] = useState(false)

  // 🔹 Fetch volunteer profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/user/volunteer/profile",
          { withCredentials: true }
        )

        const profileData = res.data.volunteerProfile
        setProfile(profileData)
        setVolunteer(profileData.volunteer)

        setAvailable(profileData.availabilityStatus === "AVAILABLE")

        if (profileData.isVerified) {
          setVerificationStatus("VERIFIED")
        }
      } catch (err) {
        console.error("Failed to load volunteer profile")
      }
    }

    fetchProfile()
  }, [])

  // 🔹 Toggle availability
  const handleAvailabilityToggle = async (value) => {
    setAvailable(value)
    setLoadingStatus(true)

    try {
      await axios.patch(
        "http://localhost:3000/api/user/volunteer/update-status",
        { availabilityStatus: value ? "AVAILABLE" : "OFFLINE" },
        { withCredentials: true }
      )
    } catch (err) {
      alert("Failed to update availability")
    } finally {
      setLoadingStatus(false)
    }
  }

  // 🔹 Request admin verification
  const handleRequestVerification = async () => {
    try {
      setRequesting(true)

      const res = await axios.post(
        "http://localhost:3000/api/volunteer/request-verification",
        {},
        { withCredentials: true }
      )

      alert(res.data.message)
      setVerificationStatus("PENDING")
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send request")
    } finally {
      setRequesting(false)
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 pt-20">
        <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col gap-6">

          {/* WELCOME */}
          <section className="bg-white border-l-4 border-green-600 rounded-lg px-6 py-4 shadow-sm">
            <h1 className="text-2xl font-bold text-green-600">
              Welcome, {volunteer?.username || "Volunteer"}
            </h1>
            <p className="text-gray-600 mt-1">
              Service and availability control panel
            </p>
          </section>

          <section className="grid grid-cols-12 gap-6">

            {/* LEFT */}
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
                value={volunteer?.email || "-"}
              />

              <InfoRow
                icon={<Phone />}
                label="Phone Number"
                value={volunteer?.phoneNumber || "-"}
              />

              <InfoRow
                icon={<MapPin />}
                label="Current Location"
                value={profile?.currentArea || "-"}
              />

              <InfoRow
                icon={<Activity />}
                label="Associated Organization"
                value={profile?.orgName || "-"}
              />

            </div>

            {/* RIGHT */}
            <div className="col-span-7 bg-white rounded-xl shadow-sm p-6 flex flex-col gap-6">

              <div className="flex items-center gap-2 text-gray-600">
                <Activity />
                <h2 className="text-lg font-semibold">
                  Service Status Overview
                </h2>
              </div>

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
                    disabled={loadingStatus}
                    onCheckedChange={handleAvailabilityToggle}
                    className="mt-2"
                  />
                </div>

                <StatusItem
                  label="Verification Status"
                  value={
                    verificationStatus === "VERIFIED"
                      ? "Verified"
                      : verificationStatus === "PENDING"
                      ? "Pending Approval"
                      : "Not Verified"
                  }
                  icon={
                    verificationStatus === "VERIFIED" ? (
                      <CheckCircle className="text-green-600" size={18} />
                    ) : (
                      <Clock className="text-yellow-500" size={18} />
                    )
                  }
                />

                {verificationStatus === "UNVERIFIED" && (
                  <div className="col-span-2">
                    <Button
                      onClick={handleRequestVerification}
                      disabled={requesting}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {requesting
                        ? "Requesting Verification..."
                        : "Request Admin Verification"}
                    </Button>
                  </div>
                )}

                <StatusItem
                  label="Total Distributions"
                  value={profile?.totalDistributions || 0}
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
    <p className={`text-xl font-bold text-green-600`}>
      {value}
    </p>
  </div>
)

export default VolunteerDashboard
