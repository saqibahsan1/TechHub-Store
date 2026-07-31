import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  refreshToken,
  forgotPassword,
  resetPassword,
} from '../controllers/authController';
import { auth, authorize } from '../middlewares/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

// Admin-only routes
router.get('/admin', auth, authorize(['Admin']), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

export default router;