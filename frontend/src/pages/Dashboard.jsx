import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Calendar, MapPin, Ticket, Clock, CheckCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    // Mock user bookings
    const bookings = [
      {
        id: "BKG-A1B2",
        event: { _id: '1', title: "Neon Nights Music Festival", date: "2024-08-15", time: "18:00", venue: "Downtown Arena", image: "https://images.unsplash.com/photo-1533174000244-b4623c10a16c?auto=format&w=200" },
        tickets: 2,
        status: "Confirmed",
        isPast: false
      },
      {
        id: "BKG-X9Y8",
        event: { _id: '2', title: "Vintage Art Fair", date: "2023-11-20", time: "10:00", venue: "Expo Center", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&w=200" },
        tickets: 1,
        status: "Attended",
        isPast: true
      }
    ];

    setUpcomingBookings(bookings.filter(b => !b.isPast));
    setPastBookings(bookings.filter(b => b.isPast));
  }, []);

  const StatusBadge = ({ status }) => {
    let color = "bg-slate-500/10 text-slate-400 border-slate-500/20";
    if (status === "Confirmed") color = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (status === "Attended") color = "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    if (status === "Cancelled") color = "bg-red-500/10 text-red-400 border-red-500/20";
    
    return <span className={`badge border ${color}`}>{status}</span>;
  };

  return (
    <div className="pt-24 pb-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-12 p-6 glass-card rounded-2xl">
        <div className="w-16 h-16 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400">
          <User size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name || "User"}!</h1>
          <p className="text-slate-400">{user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="text-pink-400" /> Upcoming Events
          </h2>
          
          <div className="space-y-4">
            {upcomingBookings.length > 0 ? upcomingBookings.map(booking => (
              <div key={booking.id} className="glass-card p-4 rounded-2xl flex gap-4 hover:shadow-[0_10px_30px_rgba(99,102,241,0.1)] transition-all">
                <img src={booking.event.image} alt="Event" className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link to={`/events/${booking.event._id}`} className="font-bold text-lg text-white hover:text-indigo-400 transition-colors line-clamp-1">
                        {booking.event.title}
                      </Link>
                      <StatusBadge status={booking.status} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                      <span className="flex items-center gap-1"><Calendar size={12}/> {booking.event.date}</span>
                      <span className="flex items-center gap-1"><Ticket size={12}/> {booking.tickets} Tickets</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-slate-500">Booking ID: {booking.id}</div>
                    <button 
                      onClick={() => alert('Will download ticket from backend in connected environment')}
                      className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <Download size={14} /> Download Ticket
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="glass-card p-8 text-center rounded-2xl">
                <p className="text-slate-400 mb-4">No upcoming events found.</p>
                <Link to="/events" className="btn-outline text-sm">Discover Events</Link>
              </div>
            )}
          </div>
        </div>

        {/* Booking History */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle className="text-indigo-400" /> Booking History
          </h2>
          
          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-slate-300 text-sm">
                  <th className="p-4 font-semibold">Event</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {pastBookings.length > 0 ? pastBookings.map(booking => (
                  <tr key={booking.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <p className="text-white font-medium line-clamp-1">{booking.event.title}</p>
                      <p className="text-xs text-slate-500">{booking.tickets} Tickets • {booking.id}</p>
                    </td>
                    <td className="p-4 text-slate-400 text-sm">{booking.event.date}</td>
                    <td className="p-4"><StatusBadge status={booking.status} /></td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-slate-400">No past bookings.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
