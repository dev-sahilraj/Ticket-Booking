import React from "react";
import Hero from "../components/Hero";
import EventCard from "../components/EventCard";
import { Sparkles, TrendingUp, Music, Trophy, Laugh } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURED_EVENTS = [
  {
    id: 1,
    name: "Neon Nights Music Festival",
    date: "Aug 15 - Aug 17, 2024",
    venue: "Downtown Arena, NY",
    availableSeats: 1250,
    price: 149,
    category: "Festival",
    image: "https://images.unsplash.com/photo-1533174000244-b4623c10a16c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Tech Innovation Summit 2024",
    date: "Sep 10, 2024",
    venue: "Convention Center, SF",
    availableSeats: 420,
    price: 299,
    category: "Conference",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Championship Finals",
    date: "Oct 05, 2024",
    venue: "National Stadium, CA",
    availableSeats: 85,
    price: 850,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=800&q=80"
  }
];

const CATEGORIES = [
  { name: "Concerts", icon: Music, color: "text-blue-400", bg: "bg-blue-400/10" },
  { name: "Sports", icon: Trophy, color: "text-amber-400", bg: "bg-amber-400/10" },
  { name: "Comedy", icon: Laugh, color: "text-pink-400", bg: "bg-pink-400/10" },
  { name: "Arts & Theater", icon: Sparkles, color: "text-purple-400", bg: "bg-purple-400/10" }
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Categories Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Sparkles className="text-indigo-400" /> Browse by Category
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link key={idx} to={`/events?category=${cat.name.toLowerCase()}`} className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{cat.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 relative bg-[#0a0a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="text-pink-400" /> Trending Events
            </h2>
            <Link to="/events" className="btn-outline">
              View All Events
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_EVENTS.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
