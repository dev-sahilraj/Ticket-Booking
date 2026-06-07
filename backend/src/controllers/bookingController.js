const Booking = require('../models/Booking');
const Event = require('../models/Event');
const { sendBookingConfirmation } = require('../services/emailService');
const { generateTicketPDF } = require('../services/pdfService');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { eventId, tickets, sendEmail } = req.body;
    const requestedSeats = Number(tickets);

    if (!requestedSeats || requestedSeats <= 0) {
      return res.status(400).json({ message: 'Invalid ticket quantity' });
    }

    const updatedEvent = await Event.findOneAndUpdate(
      { 
        _id: eventId, 
        availableSeats: { $gte: requestedSeats }
      },
      { 
        $inc: { availableSeats: -requestedSeats }
      },
      { new: true }
    );

    if (!updatedEvent) {
      const eventExists = await Event.findById(eventId);
      if (!eventExists) {
        return res.status(404).json({ message: 'Event not found' });
      }
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const bookingId = `BKG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const booking = await Booking.create({
      bookingId,
      user: req.user._id,
      event: eventId,
      tickets: requestedSeats,
      status: 'Confirmed',
    });

    // Optional Email Notification
    if (sendEmail) {
      await sendBookingConfirmation(req.user.email, req.user.name, {
        bookingId,
        eventTitle: updatedEvent.title,
        tickets: requestedSeats
      });
    }

    res.status(201).json({
      message: 'Booking successful',
      bookingId: booking.bookingId,
      event: updatedEvent.title,
      tickets: requestedSeats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Download Ticket PDF
// @route   GET /api/bookings/:id/ticket
// @access  Private
const downloadTicket = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('event')
      .populate('user', 'name email');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify ownership
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to download this ticket' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=ticket-${booking.bookingId}.pdf`);

    generateTicketPDF(booking, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  downloadTicket
};
