import React from "react"
import Navbar from "@/components/Navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Building2, Mail, Users, MapPin } from "lucide-react"

const AdminDashboard = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-24 bg-indigo-50 px-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          Admin Control Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <Card className="border-l-4 border-indigo-700">
            <CardContent className="p-5">
              <Shield className="text-indigo-700 mb-2" />
              <p className="font-semibold">Admin Username</p>
              <p className="text-gray-600">admin_aahaar</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-indigo-700">
            <CardContent className="p-5">
              <Mail className="text-indigo-700 mb-2" />
              <p className="font-semibold">Email</p>
              <p className="text-gray-600">admin@ngo.org</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-indigo-700">
            <CardContent className="p-5">
              <Building2 className="text-indigo-700 mb-2" />
              <p className="font-semibold">Organization</p>
              <p className="text-gray-600">Helping Hands NGO</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-indigo-700">
            <CardContent className="p-5">
              <MapPin className="text-indigo-700 mb-2" />
              <p className="font-semibold">Location</p>
              <p className="text-gray-600">Bengaluru</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-indigo-700 md:col-span-2">
            <CardContent className="p-5">
              <Users className="text-indigo-700 mb-2" />
              <p className="font-semibold">Associated Volunteers</p>
              <p className="text-gray-600">42 active volunteers</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  )
}

export default AdminDashboard
