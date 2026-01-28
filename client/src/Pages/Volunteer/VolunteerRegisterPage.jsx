import React, { useState } from "react";
import Navbar from "@/components/Navbar";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HandHeart, Mail, Lock, Phone, User, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VolunteerRegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/volunteer/auth/volunteerRegister",
        formData,
        { withCredentials: true },
      );

      if (res.data.success) {
        setSuccess("Registration successful. Please login to continue.");

        setFormData({
          username: "",
          email: "",
          phoneNumber: "",
          password: "",
        });

        setTimeout(() => navigate("/VolunteerLogin"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-28 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:30px_30px] opacity-20" />

        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-300/30 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-amber-300/20 blur-3xl rounded-full" />

        <Card className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-xl border-none shadow-2xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <HandHeart className="w-12 h-12 mx-auto text-green-700" />
              <h2 className="text-2xl font-bold text-gray-900">
                Volunteer Registration
              </h2>
              <p className="text-sm text-gray-600">
                Join as a helping hand during crises
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create Password"
                  className="pl-10"
                />
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}
              {success && <p className="text-xs text-green-600">{success}</p>}
            </div>

            <Button
              onClick={handleRegister}
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white flex gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <HandHeart size={18} />
              )}
              Register as Volunteer
            </Button>

            <p className="text-xs text-center text-gray-500">
              Volunteers help keep food information accurate and updated.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default VolunteerRegisterPage;
