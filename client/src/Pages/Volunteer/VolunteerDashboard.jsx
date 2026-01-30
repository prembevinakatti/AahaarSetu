import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  HandHeart,
  Mail,
  Phone,
  MapPin,
  Activity,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import axios from "axios";

const VolunteerDashboard = () => {
  const [available, setAvailable] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const [volunteer, setVolunteer] = useState(null);
  const [profile, setProfile] = useState(null);

  const [verificationStatus, setVerificationStatus] = useState("UNVERIFIED");

  // Admin modal
  const [showAdmins, setShowAdmins] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [nearestAdminId, setNearestAdminId] = useState(null);
  const [requesting, setRequesting] = useState(false);

  // Load profile
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/user/volunteer/profile",
        { withCredentials: true },
      );

      const profileData = res.data.volunteerProfile;
      setProfile(profileData);
      setVolunteer(profileData.volunteer);
      setAvailable(profileData.availabilityStatus === "AVAILABLE");

      if (profileData.isVerified) {
        setVerificationStatus("VERIFIED");
      }
    };

    fetchProfile();
  }, []);

  // Toggle availability
  const handleAvailabilityToggle = async (value) => {
    setAvailable(value);
    setLoadingStatus(true);

    try {
      await axios.patch(
        "http://localhost:3000/api/user/volunteer/update-status",
        { availabilityStatus: value ? "AVAILABLE" : "OFFLINE" },
        { withCredentials: true },
      );
    } finally {
      setLoadingStatus(false);
    }
  };

  // Get admins + find nearest
  const handleRequestVerification = async () => {
    setShowAdmins(true);

    const res = await axios.get(
      "http://localhost:3000/api/user/admin/getAllAdmins",
      { withCredentials: true },
    );

    const adminsList = res.data.admins;
    setAdmins(adminsList);

    // find nearest using simple string match (or coords if you store them)
    const volunteerArea = profile.currentArea.toLowerCase();

    let nearest = adminsList.find((a) =>
      a.location.toLowerCase().includes(volunteerArea),
    );

    if (nearest) setNearestAdminId(nearest._id);
  };

  // Send request to selected admin
  const sendVerificationRequest = async (adminId) => {
    try {
      setRequesting(true);

      await axios.post(
        `http://localhost:3000/api/admin/verify/requestVerification/${adminId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      alert("Verification request sent!");
      setVerificationStatus("PENDING");
      setShowAdmins(false);
    } catch (err) {
      console.log(err);
      alert("Failed to send request");
    } finally {
      setRequesting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 pt-20">
        <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col gap-6">
          <section className="bg-white border-l-4 border-green-600 rounded-lg px-6 py-4 shadow-sm">
            <h1 className="text-2xl font-bold text-green-600">
              Welcome, {volunteer?.username || "Volunteer"}
            </h1>
          </section>

          <section className="grid grid-cols-12 gap-6">
            {/* LEFT */}
            <div className="col-span-5 bg-white rounded-xl shadow-sm p-6 flex flex-col gap-5">
              <InfoRow icon={<Mail />} label="Email" value={volunteer?.email} />
              <InfoRow
                icon={<Phone />}
                label="Phone"
                value={volunteer?.phoneNumber}
              />
              <InfoRow
                icon={<MapPin />}
                label="Location"
                value={profile?.currentArea}
              />
              <InfoRow
                icon={<Activity />}
                label="Organization"
                value={profile?.orgName}
              />
            </div>

            {/* RIGHT */}
            <div className="col-span-7 bg-white rounded-xl shadow-sm p-6 flex flex-col gap-6">
              <StatusItem
                label="Availability"
                value={available ? "AVAILABLE" : "OFFLINE"}
              />

              <Switch
                checked={available}
                onCheckedChange={handleAvailabilityToggle}
              />

              <StatusItem
                label="Verification"
                value={
                  verificationStatus === "VERIFIED"
                    ? "Verified"
                    : verificationStatus === "PENDING"
                      ? "Pending"
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
                <Button
                  onClick={handleRequestVerification}
                  className="bg-green-600 text-white"
                >
                  Request Admin Verification
                </Button>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ================= ADMIN MODAL ================= */}
      {showAdmins && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[700px] max-h-[80vh] overflow-y-auto rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              Select Nearest Admin
            </h2>

            {admins.map((admin) => (
              <div
                key={admin._id}
                className={`border p-4 rounded-lg mb-3 flex justify-between items-center ${
                  admin._id === nearestAdminId
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div>
                  <p className="font-semibold">{admin.username}</p>
                  <p className="text-sm text-gray-600">
                    {admin.orgName} • {admin.location}
                  </p>
                  {admin._id === nearestAdminId && (
                    <p className="text-xs text-green-600 font-bold">
                      Nearest Admin
                    </p>
                  )}
                </div>

                <Button
                  disabled={requesting}
                  onClick={() => sendVerificationRequest(admin._id)}
                  className="bg-green-600 text-white"
                >
                  Send Request
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => setShowAdmins(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

/* Helpers */
const InfoRow = ({ icon, label, value }) => (
  <div className="flex gap-3">
    <div className="text-green-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-green-600">{value || "-"}</p>
    </div>
  </div>
);

const StatusItem = ({ label, value, icon }) => (
  <div>
    <p className="text-sm text-gray-500 flex items-center gap-2">
      {icon} {label}
    </p>
    <p className="text-xl font-bold text-green-600">{value}</p>
  </div>
);

export default VolunteerDashboard;
