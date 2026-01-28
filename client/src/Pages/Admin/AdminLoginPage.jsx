import React, { useState } from "react";
import Navbar from "@/components/Navbar";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Lock, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setIsSubmitting(true);
    setLoginError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/admin/loginAdmin",
        formData,
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        navigate("/AdminDashboard");
      } else {
        setLoginError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setLoginError(
        error.response?.data?.message || "Invalid email or password",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Background */}
      <div className="min-h-screen pt-28 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

        {/* Authority Glow */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-400/25 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-slate-400/20 blur-3xl rounded-full" />

        {/* Login Card */}
        <Card className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-xl border-none shadow-2xl">
          <CardContent className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <ShieldCheck className="w-12 h-12 mx-auto text-indigo-700" />
              <h2 className="text-2xl font-bold text-gray-900">
                Administrator Login
              </h2>
              <p className="text-sm text-gray-600">
                Restricted access for crisis command
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Admin Email"
                className="bg-white"
              />

              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-white"
              />

              {loginError && (
                <p className="text-xs text-red-500">{loginError}</p>
              )}
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              disabled={isSubmitting}
              className="w-full bg-indigo-700 hover:bg-indigo-800 text-white flex gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Lock size={18} />
              )}
              Login
            </Button>

            {/* Footer */}
            <p className="text-xs text-center text-gray-500">
              This panel is accessible only to verified administrators.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminLoginPage;
