const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, downloadTicket } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createBooking);

router.route('/mybookings')
  .get(protect, getMyBookings);

router.route('/:id/ticket')
  .get(protect, downloadTicket);

module.exports = router;
