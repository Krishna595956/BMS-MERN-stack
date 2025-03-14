const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000 // 5MB limit
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file (jpg, jpeg, or png)'));
    }
    cb(null, true);
  }
});

// Register user
router.post('/register', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Validate input
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email already exists' 
      });
    }

    // Create new user
    const user = new User({
      fullname,
      email: email.toLowerCase(),
      password,
      profilePicture: 'uploads/default-profile.jpg',
      bio: ''
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data and token
    res.status(201).json({
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilePicture: user.profilePicture,
        bio: user.bio
      },
      token,
      message: 'Registration successful'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: error.message || 'Error during registration' 
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const userResponse = req.user.toObject();
    if (userResponse.profilePicture) {
      userResponse.profilePicture = `${process.env.API_URL}${userResponse.profilePicture}`;
    }
    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.patch('/profile', auth, upload.single('profilePicture'), async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['fullname', 'email', 'bio', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    // Handle file upload
    if (req.file) {
      // Delete old profile picture if it exists and is not the default
      if (req.user.profilePicture && !req.user.profilePicture.includes('default-profile.jpg')) {
        try {
          const oldPicturePath = path.join(__dirname, '..', req.user.profilePicture);
          await fs.unlink(oldPicturePath);
        } catch (error) {
          console.error('Error deleting old profile picture:', error);
        }
      }
      // Store the path relative to the uploads directory
      req.user.profilePicture = `/uploads/${req.file.filename}`;
    }

    // Update other fields
    updates.forEach(update => {
      if (req.body[update]) {
        req.user[update] = req.body[update];
      }
    });

    await req.user.save();

    // Create a response object with the full image URL
    const userResponse = req.user.toObject();
    if (userResponse.profilePicture) {
      userResponse.profilePicture = `${process.env.API_URL}${userResponse.profilePicture}`;
    }

    res.json(userResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's blogs
router.get('/blogs', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;