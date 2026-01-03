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

      {/* Offset for fixed navbar */}
      <div className="pt-24 relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-white to-green-50">

        {/* === CURSOR GLOW === */}
        <div className="pointer-events-none fixed inset-0 z-30">
          <div className="absolute left-1/2 top-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-green-400/20 blur-[120px] animate-pulse" />
        </div>

        {/* === RADAR SWEEP === */}
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(34,197,94,0.12),transparent)] animate-[spin_25s_linear_infinite]" />

        {/* === NOISE TEXTURE === */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

        {/* === FLOATING PARTICLES === */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 bg-green-500/40 rounded-full animate-[float_12s_linear_infinite]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* === GRID === */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:36px_36px] opacity-20" />

        {/* === CONTENT === */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-green-100 text-green-800 px-4 py-1 shadow-lg">
              Crisis Response Platform
            </Badge>
          </div>

          {/* HERO */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
              <span className="text-green-600">AahaarSetu</span>
              <br />
              Bridging Hunger During Crises
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              When disasters strike, information saves lives.
              AahaarSetu connects people to{" "}
              <span className="font-semibold text-gray-800">
                safe, verified food distribution points
              </span>{" "}
              in real time.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <Button className="bg-green-600 hover:bg-green-700 shadow-xl">
                Find Food Near Me
              </Button>
              <Button variant="outline">
                Become a Volunteer
              </Button>
            </div>
          </div>

          {/* FEATURES */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            {[
              {
                icon: <MapPin className="w-10 h-10 text-green-600" />,
                title: "Live Food Map",
                text: "Discover nearby community kitchens, NGO food points, and relief camps on an interactive map."
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-amber-600" />,
                title: "Verified & Safe",
                text: "All food points go through NGO or admin verification to ensure safety and authenticity."
              },
              {
                icon: <HeartHandshake className="w-10 h-10 text-red-500" />,
                title: "Community Powered",
                text: "Volunteers and citizens work together to keep information updated during emergencies."
              }
            ].map((item, idx) => (
              <Card
                key={idx}
                className="group bg-white/70 backdrop-blur-xl border-none shadow-xl hover:-translate-y-3 transition-all duration-500"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="group-hover:scale-125 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Because no one should go hungry due to lack of information.
            </h2>
            <p className="text-gray-600 mt-3">
              AahaarSetu is built for humanity, powered by technology.
            </p>

            <Button className="mt-6 bg-amber-500 hover:bg-amber-600 shadow-xl">
              Launch Crisis Mode
            </Button>
          </div>

        </div>
      </div>
    </>
  )
}

export default LandingPage
