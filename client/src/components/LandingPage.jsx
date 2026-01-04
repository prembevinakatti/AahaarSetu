import React from "react"
import Navbar from "./Navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, HeartHandshake, ShieldCheck } from "lucide-react"

const LandingPage = () => {
  return (
    <>
      <Navbar />

      {/* Padding for fixed navbar */}
      <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 overflow-hidden pt-24">

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

        {/* Pulsing Circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-amber-300 rounded-full blur-3xl opacity-20 animate-pulse delay-200" />

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

          {/* Badge */}
          {/* <div className="flex justify-center mb-6">
            <Badge className="bg-green-100 text-green-800 px-4 py-1 text-sm">
              Crisis Response Platform
            </Badge>
          </div> */}

          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-6xl md:text-6xl font-bold tracking-tight text-amber-500">
              <span className="text-green-600">AahaarSetu</span>
              <br />
              Bridging Hunger During Crises
            </h1>

            <p className="max-w-5xl mx-auto text-lg text-gray-700">
              When disasters strike, information saves lives.
              AahaarSetu connects people to{" "}
              <span className="font-semibold text-gray-700">
                safe, verified food distribution points
              </span>{" "}
              in real time.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <Button size="lg" className="bg-green-500 hover:bg-green-700">
                Find Food Near Me
              </Button>
              <Button size="lg" className="bg-amber-500 hover:bg-amber-500">
                Become a Volunteer
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">

            <Card className="backdrop-blur-sm bg-white/70 border-none shadow-lg">
              <CardContent className="p-6 space-y-4">
                <MapPin className="w-10 h-10 text-amber-600" />
                <h3 className="text-xl font-semibold">Live Food Map</h3>
                <p className="text-gray-600">
                  Discover nearby community kitchens, NGO food points, and relief camps on an interactive map.
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/70 border-none shadow-lg">
              <CardContent className="p-6 space-y-4">
                <ShieldCheck className="w-10 h-10 text-green-600" />
                <h3 className="text-xl font-semibold">Verified & Safe</h3>
                <p className="text-gray-600">
                  All food points go through NGO or admin verification to ensure safety and authenticity.
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/70 border-none shadow-lg">
              <CardContent className="p-6 space-y-4">
                <HeartHandshake className="w-10 h-10 text-red-500" />
                <h3 className="text-xl font-semibold">Community Powered</h3>
                <p className="text-gray-600">
                  Volunteers and citizens work together to keep information updated during emergencies.
                </p>
              </CardContent>
            </Card>

          </div>

          {/* Bottom CTA */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Because no one should go hungry due to lack of information.
            </h2>
            <p className="text-gray-600 mt-3">
              AahaarSetu is built for humanity, powered by technology.
            </p>

            <Button
              size="lg"
              className="mt-6 bg-amber-500 hover:bg-amber-600 text-white"
            >
              Launch Crisis Mode
            </Button>
          </div>

        </div>
      </div>
    </>
  )
}

export default LandingPage
