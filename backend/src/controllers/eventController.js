const Event = require('../models/Event');
const Booking = require('../models/Booking');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const { search, category, sort, page, limit } = req.query;

    const query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (category && category !== 'All') {
      query.category = category;
    }

    let sortObj = { createdAt: -1 }; // Default new
    if (sort === 'date_asc') sortObj = { date: 1 };
    if (sort === 'date_desc') sortObj = { date: -1 };
    if (sort === 'price_asc') sortObj = { price: 1 };
    if (sort === 'price_desc') sortObj = { price: -1 };

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const events = await Event.find(query).sort(sortObj).skip(skip).limit(limitNum);
    const total = await Event.countDocuments(query);

    res.json({
      events,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      time,
      venue,
      totalSeats,
      bannerImage,
    } = req.body;

    const event = new Event({
      title,
      description,
      category,
      date,
      time,
      venue,
      totalSeats,
      availableSeats: totalSeats,
      bannerImage,
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      time,
      venue,
      totalSeats,
      bannerImage,
    } = req.body;

    const event = await Event.findById(req.params.id);

    if (event) {
      event.title = title || event.title;
      event.description = description || event.description;
      event.category = category || event.category;
      event.date = date || event.date;
      event.time = time || event.time;
      event.venue = venue || event.venue;
      
      // Calculate new available seats if total changed
      if (totalSeats) {
        const booked = event.totalSeats - event.availableSeats;
        event.totalSeats = totalSeats;
        event.availableSeats = totalSeats - booked;
      }
      
      event.bannerImage = bannerImage || event.bannerImage;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      await event.deleteOne();
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get admin statistics
// @route   GET /api/events/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
  try {
    const User = require('../models/User'); // Import dynamically to avoid circular deps if any
    
    const totalEvents = await Event.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    
    // Count upcoming events (date > today)
    const upcomingEvents = await Event.countDocuments({
      date: { $gte: new Date() }
    });

    // Aggregation: Monthly Bookings
    const monthlyBookings = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Aggregation: Popular Events (Top 5)
    const popularEvents = await Booking.aggregate([
      {
        $group: {
          _id: "$event",
          totalTicketsSold: { $sum: "$tickets" }
        }
      },
      { $sort: { totalTicketsSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "_id",
          as: "eventDetails"
        }
      },
      { $unwind: "$eventDetails" }
    ]);

    res.json({
      totalEvents,
      totalBookings,
      totalUsers,
      upcomingEvents,
      monthlyBookings,
      popularEvents: popularEvents.map(p => ({
        title: p.eventDetails.title,
        ticketsSold: p.totalTicketsSold
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Download Admin Report
// @route   GET /api/events/admin/reports?type=event-wise|user-wise|total
// @access  Private/Admin
const downloadAdminReport = async (req, res) => {
  try {
    const { generateAdminReportPDF } = require('../services/pdfService');
    const type = req.query.type || 'total';
    let data;

    if (type === 'event-wise') {
      data = await Booking.aggregate([
        { $group: { _id: "$event", ticketsSold: { $sum: "$tickets" } } },
        { $lookup: { from: "events", localField: "_id", foreignField: "_id", as: "event" } },
        { $unwind: "$event" },
        { $project: { title: "$event.title", ticketsSold: 1 } },
        { $sort: { ticketsSold: -1 } }
      ]);
    } else if (type === 'user-wise') {
      data = await Booking.aggregate([
        { $group: { _id: "$user", bookingCount: { $sum: 1 }, ticketsBought: { $sum: "$tickets" } } },
        { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
        { $unwind: "$user" },
        { $project: { email: "$user.email", bookingCount: 1, ticketsBought: 1 } },
        { $sort: { ticketsBought: -1 } }
      ]);
    } else {
      data = { totalBookings: await Booking.countDocuments() };
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=admin-report-${type}-${Date.now()}.pdf`);

    generateAdminReportPDF(type, data, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getAdminStats,
  downloadAdminReport
};
