import React from "react"


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Lock } from "lucide-react"
import Navbar from "@/components/Navbar"

const AdminLoginPage = () => {
  return (
    <>
      <Navbar/>

      {/* Background */}
      <div className="min-h-screen pt-28 flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-green-50 relative overflow-hidden">

        {/* Map Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

        {/* Soft Emergency Glow */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-green-300/30 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-red-300/20 blur-3xl rounded-full" />

        {/* Login Card */}
        <Card className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border-none shadow-2xl">
          <CardContent className="p-8 space-y-6">

            {/* Header */}
            <div className="text-center space-y-2">
              <ShieldCheck className="w-12 h-12 mx-auto text-green-700" />
              <h2 className="text-2xl font-bold text-gray-900">
                Administrator Login
              </h2>
              <p className="text-sm text-gray-600">
                Secure access for crisis coordination
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Admin Email"
                className="bg-white"
              />
              <Input
                type="password"
                placeholder="Password"
                className="bg-white"
              />
            </div>

            {/* Login Button */}
            <Button className="w-full bg-green-700 hover:bg-green-800 flex gap-2">
              <Lock size={18} />
              Login 
            </Button>

            {/* Footer Note */}
            <p className="text-xs text-center text-gray-500">
              This portal is restricted to verified AahaarSetu administrators.
            </p>

          </CardContent>
        </Card>

      </div>
    </>
  )
}

export default AdminLoginPage
