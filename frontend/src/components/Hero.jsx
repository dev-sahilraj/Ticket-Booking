import React from "react";
import { Search, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden hero-gradient min-h-[90vh] flex items-center">
      {/* Abstract Shapes for Background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: "0s" }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/10 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-pulse"></span>
            Discover over 10,000 live events
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            Experience the <br className="hidden sm:block" />
            <span className="gradient-text">Extraordinary</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Book tickets to concerts, sports, theater, and family events. Your next unforgettable memory is just a search away.
          </p>

          {/* Search Bar */}
          <div className="glass-card p-2 rounded-2xl md:rounded-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-2 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
            <div className="flex-1 w-full md:w-auto flex items-center bg-slate-900/50 rounded-xl md:rounded-full px-4 py-3">
              <Search size={20} className="text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Search events, artists, or teams"
                className="bg-transparent border-none outline-none text-white w-full placeholder-slate-500"
              />
            </div>
            
            <div className="flex-1 w-full md:w-auto flex items-center bg-slate-900/50 rounded-xl md:rounded-full px-4 py-3">
              <MapPin size={20} className="text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Location"
                className="bg-transparent border-none outline-none text-white w-full placeholder-slate-500"
              />
            </div>

            <div className="w-full md:w-auto flex items-center bg-slate-900/50 rounded-xl md:rounded-full px-4 py-3 md:hidden lg:flex">
              <Calendar size={20} className="text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Any date"
                className="bg-transparent border-none outline-none text-white w-full placeholder-slate-500"
              />
            </div>

            <button className="w-full md:w-auto btn-primary py-3 px-8 rounded-xl md:rounded-full whitespace-nowrap justify-center">
              Search
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
             <Link to="/events" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors font-medium">
               Explore all events <ArrowRight size={18} />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
