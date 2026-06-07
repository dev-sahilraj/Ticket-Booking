import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { Search, Filter, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ["All", "Festival", "Conference", "Sports", "Comedy", "Arts"];

  // Mock API Call simulating backend filtering
  useEffect(() => {
    setLoading(true);
    // In production, this would be: 
    // fetch(`/api/events?search=${search}&category=${category}&sort=${sort}&page=${page}&limit=6`)
    setTimeout(() => {
      const mockData = [
        { id: 1, _id: "1", title: "Neon Nights Music Festival", date: "2024-08-15", time: "18:00", venue: "Downtown Arena", availableSeats: 400, price: 149, category: "Festival", image: "https://images.unsplash.com/photo-1533174000244-b4623c10a16c?auto=format&w=800" },
        { id: 2, _id: "2", title: "Tech Innovators Summit", date: "2024-09-10", time: "09:00", venue: "Convention Center", availableSeats: 50, price: 299, category: "Conference", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&w=800" },
        { id: 3, _id: "3", title: "City Marathon 2024", date: "2024-10-05", time: "06:00", venue: "City Square", availableSeats: 0, price: 49, category: "Sports", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&w=800" },
        { id: 4, _id: "4", title: "Standup Comedy Night", date: "2024-07-20", time: "20:00", venue: "Laugh Factory", availableSeats: 120, price: 35, category: "Comedy", image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&w=800" },
        { id: 5, _id: "5", title: "Modern Art Exhibition", date: "2024-08-01", time: "10:00", venue: "Grand Gallery", availableSeats: 500, price: 25, category: "Arts", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&w=800" },
      ];

      // Local mock filtering for sandbox
      let filtered = mockData.filter(e => 
        e.title.toLowerCase().includes(search.toLowerCase()) && 
        (category === "All" || e.category === category)
      );

      if (sort === "price_asc") filtered.sort((a,b) => a.price - b.price);
      if (sort === "price_desc") filtered.sort((a,b) => b.price - a.price);

      setEvents(filtered);
      setTotalPages(Math.ceil(filtered.length / 6) || 1);
      setLoading(false);
    }, 600); // Artificial delay to show skeletons
  }, [search, category, sort, page]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 min-h-screen bg-[#0f0f1a]"
    >
      <Helmet>
        <title>Explore Events | EventHub</title>
        <meta name="description" content="Discover and book the best events around you." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search Bar */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-white mb-4">Explore Events</h1>
          <p className="text-slate-400 max-w-2xl">Find your next unforgettable experience from our curated list of festivals, conferences, and more.</p>
        </div>

        {/* Filters Section */}
        <div className="glass-card p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-20 z-30 shadow-2xl shadow-indigo-500/10">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search events by name..." 
              value={search}
              onChange={(e) => {setSearch(e.target.value); setPage(1);}}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          
          <div className="flex w-full md:w-auto gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {setCategory(cat); setPage(1);}}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  category === cat ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-auto flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-slate-400" />
            <select 
              value={sort}
              onChange={(e) => {setSort(e.target.value); setPage(1);}}
              className="bg-transparent text-slate-300 text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-slate-800 text-white">Newest First</option>
              <option value="price_asc" className="bg-slate-800 text-white">Price: Low to High</option>
              <option value="price_desc" className="bg-slate-800 text-white">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {loading ? (
              // Skeletons
              [...Array(6)].map((_, i) => (
                <motion.div 
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-2xl p-4 h-[400px] flex flex-col animate-pulse"
                >
                  <div className="w-full h-48 bg-slate-800/50 rounded-xl mb-4"></div>
                  <div className="h-6 bg-slate-800/50 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-slate-800/50 rounded w-1/2 mb-6"></div>
                  <div className="mt-auto h-10 bg-slate-800/50 rounded-xl w-full"></div>
                </motion.div>
              ))
            ) : events.length > 0 ? (
              events.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                  <Filter size={32} className="text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
                <p className="text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => {setSearch(""); setCategory("All");}}
                  className="mt-6 btn-outline"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {!loading && events.length > 0 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 rounded-xl bg-slate-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-slate-400 font-medium">Page <span className="text-white">{page}</span> of {totalPages}</span>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-2 rounded-xl bg-slate-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Events;
