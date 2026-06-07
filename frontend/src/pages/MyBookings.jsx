import React from "react";
import { Ticket, Calendar, MapPin } from "lucide-react";

const MyBookings = () => {
  // Mock data for bookings
  const bookings = [
    {
      id: "BK1092",
      event: "Neon Nights Music Festival",
      date: "Aug 15, 2024",
      venue: "Downtown Arena, NY",
      tickets: 2,
      status: "Confirmed",
      image: "https://images.unsplash.com/photo-1533174000244-b4623c10a16c?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <Ticket className="text-indigo-400" /> My Bookings
      </h1>

      <div className="space-y-6">
        {bookings.map(booking => (
          <div key={booking.id} className="glass-card rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
            <img 
              src={booking.image} 
              alt={booking.event} 
              className="w-full md:w-48 h-32 object-cover rounded-xl"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{booking.event}</h3>
                <span className="badge bg-green-500/10 text-green-400 border-green-500/20">{booking.status}</span>
              </div>
              <p className="text-sm text-slate-400 mb-4">Booking ID: {booking.id}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-400" /> {booking.date}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-pink-400" /> {booking.venue}
                </div>
                <div className="flex items-center gap-2">
                  <Ticket size={16} className="text-amber-400" /> {booking.tickets} Tickets
                </div>
              </div>
            </div>
            <div className="flex md:flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
              <button className="btn-primary w-full justify-center">View Tickets</button>
              <button className="btn-outline w-full justify-center text-sm py-2">Get Help</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
