import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle, Ticket, Calendar, ArrowRight, Download } from "lucide-react";

const BookingSuccess = () => {
  const location = useLocation();
  const { state } = location;

  if (!state || !state.bookingId) {
    return <Navigate to="/" replace />;
  }

  const handleDownload = () => {
    // In a real setup, this would be an API call to download the PDF
    // e.g. window.open(`http://localhost:5000/api/bookings/${state.rawId}/ticket`, '_blank');
    alert("In a connected environment, this will download the Ticket PDF from the backend server.");
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[100px]"></div>

      <div className="max-w-md w-full relative z-10 animate-fade-in-up">
        <div className="glass-card rounded-3xl p-8 text-center border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-slate-400 mb-8">Your tickets have been successfully secured.</p>

          <div className="bg-slate-900/50 rounded-2xl p-6 mb-8 text-left border border-slate-800">
            <div className="mb-4 pb-4 border-b border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Booking Reference</p>
                <p className="text-xl font-mono font-bold text-indigo-400">{state.bookingId}</p>
              </div>
              <button onClick={handleDownload} className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors" title="Download Ticket">
                <Download size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Ticket size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-400">Event</p>
                  <p className="font-medium text-white">{state.event}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-400">Tickets</p>
                  <p className="font-medium text-white">{state.tickets}x General Admission</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/bookings" className="btn-primary w-full justify-center">
              View My Tickets <ArrowRight size={18} />
            </Link>
            <Link to="/" className="btn-outline w-full justify-center text-slate-300 border-slate-700 hover:bg-slate-800">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
