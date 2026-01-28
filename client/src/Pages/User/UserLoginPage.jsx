import React, { useState } from "react"
import axios from "axios"
import Navbar from "@/components/Navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { User, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"

const UserLoginPage = () => {
  const navigate=useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/auth/userLogin",
        form,
        { withCredentials: true }
      );

      alert(res.data.message);
      navigate("UserProfile");
    } catch (error) {
      alert(error.response?.data?.message || "Error logging user")
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-28 flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:28px_28px] opacity-20" />

        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-amber-300/30 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-amber-400/20 blur-3xl rounded-full" />

        <Card className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-xl border-none shadow-2xl">
          <CardContent className="p-8 space-y-6">

            <div className="text-center space-y-2">
              <User className="w-12 h-12 mx-auto text-amber-600" />
              <h2 className="text-2xl font-bold text-gray-900">User Login</h2>
              <p className="text-sm text-gray-600">
                Access food support and crisis updates
              </p>
            </div>

            <div className="space-y-4">
              <Input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="bg-white" />
              <Input type="password" name="password" placeholder="Password" onChange={handleChange} className="bg-white" />
            </div>

            <Button onClick={handleSubmit} className="w-full bg-amber-500 hover:bg-amber-600 text-white flex gap-2">
              <Lock size={18} /> Login
            </Button>

            <p className="text-xs text-center text-gray-500">
              For citizens, volunteers, and NGO members.
            </p>

          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default UserLoginPage
