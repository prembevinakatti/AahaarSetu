import React, { useState } from "react"
import Navbar from "@/components/Navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Phone, Mail, MapPin, Activity, CheckCircle } from "lucide-react"

const VolunteerDashboard = () => {
  const [available, setAvailable] = useState(true)

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-24 bg-green-50 px-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">
          Volunteer Service Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6">

          <Card className="md:col-span-2">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-xl font-semibold">Volunteer Details</h2>
              <p>Email: volunteer@mail.com</p>
              <p>Phone: 9876543210</p>
              <p>Organization: Helping Hands NGO</p>
              <p>Location: Whitefield</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <p className="font-semibold">Availability</p>
              <Switch checked={available} onCheckedChange={setAvailable} />
              <p className="mt-2 text-green-600">
                {available ? "AVAILABLE" : "OFFLINE"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="mx-auto text-green-600" />
              <Badge className="mt-2 bg-green-600">Verified</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Activity className="text-green-600" />
              <p>Total Distributions</p>
              <h2 className="text-2xl font-bold">128</h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <MapPin className="text-green-600" />
              <p>Last Active</p>
              <p>Today</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  )
}

export default VolunteerDashboard
