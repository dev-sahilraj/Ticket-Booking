import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Lock, Bookmark, Save } from "lucide-react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "../components/EventCard";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Simulate API call
    toast.success("Profile updated successfully!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    // Simulate API call
    toast.success("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 min-h-screen bg-[#0f0f1a]"
    >
      <Helmet>
        <title>My Profile | EventHub</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-white mb-8">My Profile</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            <button
              onClick={() => setActiveTab("account")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === "account" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <User size={18} /> Account Details
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === "security" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Lock size={18} /> Security
            </button>
            <button
              onClick={() => setActiveTab("bookmarks")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === "bookmarks" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Bookmark size={18} /> Saved Events
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === "account" && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6">Account Details</h2>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <button type="submit" className="btn-primary mt-4">
                      <Save size={18} /> Save Changes
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6">Change Password</h2>
                  <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Current Password</label>
                      <input 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">New Password</label>
                      <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <button type="submit" className="btn-primary mt-4">
                      Update Password
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === "bookmarks" && (
                <motion.div
                  key="bookmarks"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Simulated Bookmark */}
                    <EventCard event={{
                      id: 1, _id: "1", title: "Neon Nights Music Festival", date: "2024-08-15", time: "18:00", venue: "Downtown Arena", availableSeats: 400, price: 149, category: "Festival", image: "https://images.unsplash.com/photo-1533174000244-b4623c10a16c?auto=format&w=800"
                    }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
