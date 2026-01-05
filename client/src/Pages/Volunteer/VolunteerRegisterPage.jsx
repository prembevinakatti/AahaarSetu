import React from "react";
import Navbar from "@/components/Navbar";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HandHeart, Mail, Lock, Phone, User } from "lucide-react";

const VolunteerRegisterPage = () => {
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

        {/* Register Card */}
        <Card className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-xl border-none shadow-2xl">
          <CardContent className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <HandHeart className="w-12 h-12 mx-auto text-green-700" />
              <h2 className="text-2xl font-bold text-gray-900">
                Volunteer Registration
              </h2>
              <p className="text-sm text-gray-600">
                Join as a helping hand during crises
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input type="text" placeholder="Full Name" className="pl-10" />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Create Password"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Register Button */}
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex gap-2">
              <HandHeart size={18} />
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
