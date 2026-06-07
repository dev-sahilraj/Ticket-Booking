import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Zap, Menu, X, Ticket, LogOut, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Events", to: "/events" },
  ];

  if (user) {
    if (user.role === 'admin') {
      navLinks.push({ label: "Admin Panel", to: "/admin" });
    } else {
      navLinks.push({ label: "Dashboard", to: "/dashboard" });
      navLinks.push({ label: "My Bookings", to: "/bookings" });
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? "rgba(15,15,26,0.95)" : "rgba(15,15,26,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: isScrolled ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
        boxShadow: isScrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #6366f1, #ec4899)",
                boxShadow: "0 0 20px rgba(99,102,241,0.4)",
              }}
            >
              <Ticket size={18} color="white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              EventHub
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-200 relative pb-1 ${
                    isActive ? "text-indigo-400" : "text-slate-400 hover:text-white"
                  }`
                }
                style={({ isActive }) => ({
                  borderBottom: isActive ? "2px solid #6366f1" : "2px solid transparent",
                })}
              >
                {link.label === "Admin Panel" && <Shield size={14} className="inline mr-1" />}
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors p-2"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-slate-900 border border-slate-800 py-1 flex flex-col z-50">
                    {user.role === "admin" && (
                      <Link to="/admin" className="px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                        Admin Dashboard
                      </Link>
                    )}
                    <Link to="/profile" className="px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                      Profile Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800 transition-colors border-t border-slate-800/50 mt-1"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-outline" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
                  Login
                </Link>
                <Link to="/register" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
                  <Zap size={14} /> Register
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isMobileOpen ? "400px" : "0",
          background: "rgba(15,15,26,0.98)",
          borderTop: isMobileOpen ? "1px solid rgba(99,102,241,0.15)" : "none",
        }}
      >
        <div className="px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium py-2 px-3 rounded-lg transition-all ${
                  isActive ? "text-indigo-400 bg-indigo-900/30" : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`
              }
            >
              {link.label === "Admin Panel" && <Shield size={14} className="inline mr-1" />}
              {link.label}
            </NavLink>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
            {user ? (
               <button onClick={handleLogout} className="btn-outline w-full justify-center">
                 <LogOut size={14} /> Logout
               </button>
            ) : (
              <>
                <Link to="/login" className="btn-outline w-full justify-center">Login</Link>
                <Link to="/register" className="btn-primary w-full justify-center">
                  <Zap size={14} /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
