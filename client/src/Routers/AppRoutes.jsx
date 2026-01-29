import LandingPage from "@/components/LandingPage";
import AdminLoginPage from "@/Pages/Admin/AdminLoginPage";
import AdminRegisterPage from "@/Pages/Admin/AdminRegisterPage";
import AdminDashboard from "@/Pages/Admin/AdminDashboard";
import HomePage from "@/components/HomePage";
import UserLoginPage from "@/Pages/User/UserLoginPage";
import UserProfilePage from "@/Pages/User/UserProfilePage";
import UserRegisterPage from "@/Pages/User/UserRegisterPage";
import UserDashboard from "@/Pages/User/UserDashboard";
import VolunteerLoginPage from "@/Pages/Volunteer/VolunteerLoginPage";
import VolunteerProfilePage from "@/Pages/Volunteer/VolunteerProfilePage";
import VolunteerRegisterPage from "@/Pages/Volunteer/VolunteerRegisterPage";
import VolunteerDashboard from "@/Pages/Volunteer/VolunteerDashboard";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AddFoodPoint from "@/Pages/Volunteer/AddFoodPoint";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/AdminLogin" element={<AdminLoginPage />} />
        <Route path="/AdminRegister" element={<AdminRegisterPage />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/UserLogin" element={<UserLoginPage />} />
        <Route path="/UserRegister" element={<UserRegisterPage />} />
        <Route path="/UserProfile" element={<UserProfilePage />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/VolunteerLogin" element={<VolunteerLoginPage />} />
        <Route path="/VolunteerRegister" element={<VolunteerRegisterPage />} />
        <Route path="/VolunteerDashboard" element={<VolunteerDashboard />} />
        <Route path="/VolunteerProfile" element={<VolunteerProfilePage />} />
        <Route path="/AddFoodPoint" element={<AddFoodPoint />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
