import React from "react"
import Navbar from "@/components/Navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShieldPlus, UserCheck, Building2, MapPin } from "lucide-react"

const AdminRegisterPage = () => {
  return (
    <>
      <Navbar />

      {/* Background */}
      <div className="min-h-screen pt-28 flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-green-50 relative overflow-hidden">

        {/* Map Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

        {/* Soft Emergency Glow */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-green-300/30 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-amber-300/20 blur-3xl rounded-full" />

        {/* Register Card */}
        <Card className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border-none shadow-2xl">
          <CardContent className="p-8 space-y-6">

            {/* Header */}
            <div className="text-center space-y-2">
              <ShieldPlus className="w-12 h-12 mx-auto text-green-700" />
              <h2 className="text-2xl font-bold text-gray-900">
                Admin Registration
              </h2>
              <p className="text-sm text-gray-600">
                Register authorized crisis coordinators
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">

              <Input
                type="text"
                placeholder="Username"
                className="bg-white"
              />

              <Input
                type="email"
                placeholder="Admin Email"
                className="bg-white"
              />

              <div className="relative">
                <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Organization Name"
                  className="bg-white pl-10"
                />
              </div>

              <div className="relative">
                <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Organization Registration Number"
                  className="bg-white pl-10"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Location / City"
                  className="bg-white pl-10"
                />
              </div>

              <Input
                type="password"
                placeholder="Create Password"
                className="bg-white"
              />

            </div>

            {/* Register Button */}
            <Button className="w-full bg-green-700 hover:bg-green-800 flex gap-2">
              <UserCheck size={18} />
              Register Admin
            </Button>

            {/* Footer Note */}
            <p className="text-xs text-center text-gray-500">
              Admin accounts require verification before activation.
            </p>

          </CardContent>
        </Card>

      </div>
    </>
  )
}

export default AdminRegisterPage
