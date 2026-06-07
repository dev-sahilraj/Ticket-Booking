import React from "react";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden group transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent z-10 opacity-60"></div>
        <img
          src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className="badge" style={{ background: "rgba(15,15,26,0.8)", backdropFilter: "blur(10px)" }}>
            {event.category || "Music"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-indigo-400 transition-colors">
          {event.name}
        </h3>

        <div className="space-y-2 mb-6 flex-grow">
          <div className="flex items-center text-slate-400 text-sm">
            <Calendar size={16} className="mr-2 text-indigo-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-slate-400 text-sm">
            <MapPin size={16} className="mr-2 text-pink-400" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center text-slate-400 text-sm">
            <Users size={16} className="mr-2 text-amber-400" />
            <span>{event.availableSeats} seats available</span>
          </div>
        </div>

        {/* Footer/Action */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "rgba(99,102,241,0.1)" }}>
          <div>
            <span className="text-xs text-slate-400 block">Starting from</span>
            <span className="text-lg font-bold text-white">${event.price || "49"}</span>
          </div>
          <Link
            to={`/events/${event._id || event.id}`}
            className="flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-lg"
          >
            Book Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
