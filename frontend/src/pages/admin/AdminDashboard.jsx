import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Calendar, Users, TrendingUp, Plus, Edit, Trash2, Ticket, Download } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalEvents: 0, totalBookings: 0, upcomingEvents: 0, totalUsers: 0 });
  const [events, setEvents] = useState([]);
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);

  // Mock data to visualize charts locally
  useEffect(() => {
    setStats({ totalEvents: 24, totalBookings: 856, upcomingEvents: 8, totalUsers: 1204 });
    setEvents([
      { _id: '1', title: 'Neon Nights', date: '2024-08-15', totalSeats: 1250, availableSeats: 400 },
      { _id: '2', title: 'Tech Summit', date: '2024-09-10', totalSeats: 420, availableSeats: 50 },
    ]);
    
    // Monthly Mock Data
    setMonthlyBookings([
      { _id: 1, count: 120 }, { _id: 2, count: 150 }, { _id: 3, count: 180 },
      { _id: 4, count: 220 }, { _id: 5, count: 300 }, { _id: 6, count: 250 }
    ]);

    // Popular Events Mock Data
    setPopularEvents([
      { title: "Neon Nights", ticketsSold: 850 },
      { title: "Tech Summit", ticketsSold: 370 },
      { title: "Comedy Night", ticketsSold: 120 },
    ]);
  }, []);

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e._id !== id));
    }
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Bookings',
        data: monthlyBookings.map(m => m.count),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: popularEvents.map(p => p.title),
    datasets: [
      {
        data: popularEvents.map(p => p.ticketsSold),
        backgroundColor: ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6'],
        borderWidth: 0,
        hoverOffset: 4
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#cbd5e1' } }
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'right', labels: { color: '#cbd5e1' } }
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Platform Overview & Analytics</p>
        </div>
        <Link to="/admin/events/create" className="btn-primary">
          <Plus size={18} /> Create Event
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Total Users</p>
            <h3 className="text-2xl font-bold text-white">{stats.totalUsers}</h3>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Total Events</p>
            <h3 className="text-2xl font-bold text-white">{stats.totalEvents}</h3>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Ticket size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Total Bookings</p>
            <h3 className="text-2xl font-bold text-white">{stats.totalBookings}</h3>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Upcoming Events</p>
            <h3 className="text-2xl font-bold text-white">{stats.upcomingEvents}</h3>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="glass-card p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Monthly Bookings</h2>
          <div className="h-64">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Popular Events (Bookings)</h2>
          <div className="h-64 flex justify-center">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-indigo-500/20">
          <h2 className="text-xl font-bold text-white">Event Wise Bookings & Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-300 text-sm">
                <th className="p-4 font-semibold">Event Title</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Total Seats</th>
                <th className="p-4 font-semibold">Booked</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                const booked = event.totalSeats - event.availableSeats;
                return (
                <tr key={event._id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-white font-medium">{event.title}</td>
                  <td className="p-4 text-slate-400">{event.date}</td>
                  <td className="p-4 text-slate-400">{event.totalSeats}</td>
                  <td className="p-4 text-indigo-400 font-medium">{booked}</td>
                  <td className="p-4 flex justify-end gap-3">
                    <Link to={`/admin/events/edit/${event._id}`} className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors">
                      <Edit size={16} />
                    </Link>
                    <button onClick={() => handleDelete(event._id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Reports */}
      <div className="mt-8 glass-card rounded-2xl overflow-hidden p-6">
        <h2 className="text-xl font-bold text-white mb-6">System Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => alert('Will trigger PDF download: /api/events/admin/reports?type=total')}
            className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-indigo-500/20 hover:bg-slate-800 transition-colors"
          >
            <div className="text-left">
              <p className="font-medium text-white">Total Summary</p>
              <p className="text-xs text-slate-400 mt-1">Overall platform stats</p>
            </div>
            <Download size={18} className="text-indigo-400" />
          </button>
          <button 
            onClick={() => alert('Will trigger PDF download: /api/events/admin/reports?type=event-wise')}
            className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-pink-500/20 hover:bg-slate-800 transition-colors"
          >
            <div className="text-left">
              <p className="font-medium text-white">Event Bookings</p>
              <p className="text-xs text-slate-400 mt-1">Ticket sales per event</p>
            </div>
            <Download size={18} className="text-pink-400" />
          </button>
          <button 
            onClick={() => alert('Will trigger PDF download: /api/events/admin/reports?type=user-wise')}
            className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-emerald-500/20 hover:bg-slate-800 transition-colors"
          >
            <div className="text-left">
              <p className="font-medium text-white">User Activity</p>
              <p className="text-xs text-slate-400 mt-1">Bookings per user</p>
            </div>
            <Download size={18} className="text-emerald-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
