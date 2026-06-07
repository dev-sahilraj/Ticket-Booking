import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Save, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Festival",
    date: "",
    time: "",
    venue: "",
    totalSeats: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      // Mock fetch existing event data
      setFormData({
        title: "Neon Nights Music Festival",
        description: "An amazing night of music.",
        category: "Festival",
        date: "2024-08-15",
        time: "18:00",
        venue: "Downtown Arena",
        totalSeats: "1250",
      });
      setPreview("https://images.unsplash.com/photo-1533174000244-b4623c10a16c?auto=format&fit=crop&w=800&q=80");
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // API logic for creating/updating event and uploading image goes here
    console.log("Submitting:", formData, imageFile);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate("/admin");
    }, 1000);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <button onClick={() => navigate("/admin")} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="glass-card rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          {isEditing ? "Edit Event" : "Create New Event"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Area */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Event Banner</label>
            <div className="border-2 border-dashed border-indigo-500/30 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-900/50 hover:bg-slate-900/80 transition-colors relative">
              {preview ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden group">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Click to change</span>
                  </div>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleImageChange} />
                </div>
              ) : (
                <>
                  <Upload size={32} className="text-indigo-400 mb-3" />
                  <p className="text-slate-300 font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-slate-500 text-xs">PNG, JPG, WEBP up to 5MB</p>
                  <input type="file" required={!isEditing} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleImageChange} />
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Event Title</label>
              <input type="text" required className="input-field" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select className="input-field" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="Festival">Festival</option>
                <option value="Conference">Conference</option>
                <option value="Sports">Sports</option>
                <option value="Comedy">Comedy</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea required rows="4" className="input-field resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
              <input type="date" required className="input-field" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Time</label>
              <input type="time" required className="input-field" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Total Seats</label>
              <input type="number" min="1" required className="input-field" value={formData.totalSeats} onChange={(e) => setFormData({...formData, totalSeats: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Venue</label>
            <input type="text" required className="input-field" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} />
          </div>

          <div className="pt-4 border-t border-indigo-500/20 flex justify-end">
            <button type="submit" disabled={isLoading} className="btn-primary flex items-center gap-2">
              <Save size={18} /> {isLoading ? "Saving..." : isEditing ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
