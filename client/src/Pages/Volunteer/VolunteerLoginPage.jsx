import React, { useState } from "react";
import Navbar from "@/components/Navbar";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HandHeart, Lock, Mail, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/authSlice";

const VolunteerLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/volunteer/auth/volunteerLogin",
        formData,
        { withCredentials: true },
      );

      if (res.data.success && !res.data.volunteerProfile) {
        navigate("/VolunteerProfile");
      } else {
        navigate("/VolunteerDashboard");
      }

      dispatch(
        setAuthUser({
          user: res.data.volunteer,
          isAuthenticated: true,
        }),
      );
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Background */}
      <div className="min-h-screen pt-28 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-amber-50 relative overflow-hidden">
        {/* Soft Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:30px_30px] opacity-20" />

        {/* Green Glow */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-300/30 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-amber-300/20 blur-3xl rounded-full" />

        {/* Login Card */}
        <Card className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-xl border-none shadow-2xl">
          <CardContent className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <HandHeart className="w-12 h-12 mx-auto text-green-700" />
              <h2 className="text-2xl font-bold text-gray-900">
                Volunteer Login
              </h2>
              <p className="text-sm text-gray-600">
                Help communities during crisis situations
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="bg-white pl-10"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="bg-white pl-10"
                />
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white flex gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Lock size={18} />
              )}
              Login as Volunteer
            </Button>

            {/* Footer */}
            <p className="text-xs text-center text-gray-500">
              Volunteers play a crucial role in keeping food information
              updated.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default VolunteerLoginPage;
