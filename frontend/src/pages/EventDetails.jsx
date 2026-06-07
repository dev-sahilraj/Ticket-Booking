import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Calendar, MapPin, Users, Ticket, ArrowLeft, Info, CheckCircle } from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sendEmail, setSendEmail] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState("");

  // Mock fetch event logic
  useEffect(() => {
    // In reality, this would fetch from /api/events/:id
    setEvent({
      _id: id,
      title: "Neon Nights Music Festival",
      description: "Experience the ultimate night of electronic dance music under neon lights. Featuring top DJs from around the world, spectacular light shows, and an unforgettable atmosphere. Join thousands of fans for the most anticipated festival of the year.",
      category: "Festival",
      date: "2024-08-15",
      time: "18:00",
      venue: "Downtown Arena, NY",
      totalSeats: 1250,
      availableSeats: 40, // Low seats to test UI
      price: 149,
      bannerImage: "https://images.unsplash.com/photo-1533174000244-b4623c10a16c?auto=format&fit=crop&w=1200&q=80"
    });
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (quantity > event.availableSeats) {
      setError("Not enough seats available.");
      return;
    }

    setIsBooking(true);
    setError("");

    try {
      // Mock API call to /api/bookings
      /* 
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ eventId: event._id, tickets: quantity, sendEmail })
      });
      const data = await response.json();
      */

      // Mock successful response
      setTimeout(() => {
        const mockBookingId = `BKG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setIsBooking(false);
        navigate("/booking-success", { state: { bookingId: mockBookingId, event: event.title, tickets: quantity } });
      }, 1500);

    } catch (err) {
      setError("An error occurred during booking.");
      setIsBooking(false);
    }
  };

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading event...</div>;
  }

  return (
    <div className="pt-24 pb-20 min-h-screen relative">
      {/* Background Banner Blur */}
      <div 
        className="absolute top-0 left-0 right-0 h-96 opacity-20 filter blur-3xl z-0"
        style={{ backgroundImage: `url(${event.bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors font-medium">
          <ArrowLeft size={18} /> Back to Events
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative h-80 sm:h-96">
              <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4">
                <span className="badge bg-indigo-500/80 text-white border-indigo-400/50 backdrop-blur-md">
                  {event.category}
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">{event.title}</h1>
              
              <div className="flex flex-wrap gap-6 mb-8 text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Date & Time</p>
                    <p className="font-medium text-white">{event.date} at {event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Venue</p>
                    <p className="font-medium text-white">{event.venue}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-3">About this Event</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-6 sticky top-28">
              <h3 className="text-2xl font-bold text-white mb-6">Book Tickets</h3>
              
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-indigo-500/20">
                <div>
                  <p className="text-slate-400 text-sm">Price per ticket</p>
                  <p className="text-3xl font-bold text-white">${event.price || 49}</p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
                    <CheckCircle size={14} /> Available
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{event.availableSeats} seats left</p>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-3">Select Quantity</label>
                <div className="flex items-center justify-between p-2 bg-slate-900/50 rounded-xl border border-indigo-500/20">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-white w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(event.availableSeats, quantity + 1))}
                    className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 text-lg font-bold text-white">
                <span>Total Amount:</span>
                <span className="text-indigo-400">${(event.price || 49) * quantity}</span>
              </div>

              <div className="mb-6 flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="sendEmail" 
                  checked={sendEmail} 
                  onChange={(e) => setSendEmail(e.target.checked)} 
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
                />
                <label htmlFor="sendEmail" className="text-sm text-slate-300 cursor-pointer">
                  Send booking confirmation via email
                </label>
              </div>

              <button 
                onClick={handleBooking}
                disabled={isBooking || event.availableSeats === 0}
                className="w-full btn-primary py-4 text-lg justify-center shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Ticket size={20} />
                {isBooking ? "Processing..." : event.availableSeats === 0 ? "Sold Out" : "Confirm Booking"}
              </button>

              <div className="mt-4 flex items-start gap-2 text-xs text-slate-500">
                <Info size={14} className="shrink-0 mt-0.5" />
                <p>By clicking "Confirm Booking", you agree to our Terms of Service and Cancellation Policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
