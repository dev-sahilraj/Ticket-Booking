import React from "react";
import { Link } from "react-router-dom";
import { Mail, Ticket } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t" style={{ borderColor: "rgba(99,102,241,0.2)", background: "#0a0a12" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #ec4899)",
                }}
              >
              </div>
              <span className="text-xl font-bold text-white">EventHub</span>
            </Link>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Discover, book, and experience the best events happening around you. Your gateway to unforgettable moments.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                Github
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                Linkedin
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/events" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">
                  All Events
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/venues" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">
                  Venues
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to our newsletter for the latest events and exclusive offers.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field text-sm"
                style={{ padding: "0.6rem 1rem" }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: "0.6rem 1rem", borderRadius: "0.75rem" }}
              >
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EventHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-slate-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
