import React, { useState } from "react";
import logo from "../assets/AahaarSetu.png";
import { Button } from "@/components/ui/button";
import {
  ShieldAlert,
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
  MapPin,
  LogOut,
  LocateFixed,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [crisisActive, setCrisisActive] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [location, setLocation] = useState("");
  const [reason, setReason] = useState("");
  const [locating, setLocating] = useState(false);

  /* ---------- GET CURRENT LOCATION (API CALL) ---------- */
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          // Reverse geocoding API (OpenStreetMap)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          if (data?.display_name) {
            setLocation(data.display_name);
          } else {
            setLocation(`${latitude}, ${longitude}`);
          }
        } catch {
          alert("Failed to fetch location");
        } finally {
          setLocating(false);
        }
      },
      () => {
        alert("Unable to fetch location");
        setLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  /* ---------- CRISIS MODE HANDLERS (UI ONLY) ---------- */
  const handleActivateCrisis = () => {
    if (!location) {
      alert("Location is required");
      return;
    }

    setCrisisActive(true);
    document.body.classList.add("crisis-mode");

    setOpenDialog(false);
    setLocation("");
    setReason("");
  };

  const handleDeactivateCrisis = () => {
    setCrisisActive(false);
    document.body.classList.remove("crisis-mode");
  };

  const handleCrisisClick = () => {
    crisisActive ? handleDeactivateCrisis() : setOpenDialog(true);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="AahaarSetu" className="w-14 h-14" />
            <span className="text-xl font-bold text-orange-500">
              Aahaar<span className="text-green-700">Setu</span>
            </span>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            {crisisActive && (
              <div className="emergency-badge">
                <span className="emergency-dot" />
                EMERGENCY
              </div>
            )}

            <Button
              onClick={handleCrisisClick}
              className={`gap-2 shadow-lg ${
                crisisActive
                  ? "bg-gray-800 hover:bg-gray-900"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              <ShieldAlert size={18} />
              {crisisActive ? "End Crisis" : "Crisis Mode"}
            </Button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MENU */}
        {menuOpen && (
          <div className="absolute right-6 top-[4.5rem] w-64 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">
            {/* Menu Items */}
            <div className="py-2">
              <button className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                <LayoutDashboard size={18} className="text-gray-500" />
                Dashboard
              </button>

              <button className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                <PlusCircle size={18} className="text-gray-500" />
                Add Food Point
              </button>

              <button className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                <MapPin size={18} className="text-gray-500" />
                All Food Points
              </button>
            </div>

            {/* Divider */}
            <div className="border-t" />

            {/* Logout */}
            <button className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* ---------- CRISIS DIALOG ---------- */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <ShieldAlert /> Activate Crisis Mode
            </DialogTitle>
          </DialogHeader>

          {/* LOCATION */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                placeholder={
                  locating ? "Fetching location..." : "Enter or detect location"
                }
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                onClick={handleGetLocation}
                disabled={locating}
                className="absolute right-2 top-2 text-gray-500 hover:text-black disabled:opacity-50"
                title="Use current location"
              >
                <LocateFixed size={18} />
              </button>
            </div>
          </div>

          {/* REASON */}
          <div className="space-y-2 mt-4">
            <label className="text-sm font-medium">
              Reason <span className="text-gray-400">(optional)</span>
            </label>
            <Textarea
              placeholder="Flood, earthquake, food shortage..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleActivateCrisis}
              className="bg-red-600 hover:bg-red-700"
            >
              Activate Crisis
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
