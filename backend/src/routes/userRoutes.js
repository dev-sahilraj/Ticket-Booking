const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  toggleBookmark
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/password')
  .put(protect, changePassword);

router.route('/bookmarks/:eventId')
  .post(protect, toggleBookmark);

module.exports = router;
