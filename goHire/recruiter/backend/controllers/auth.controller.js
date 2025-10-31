const bcrypt = require('bcryptjs');
const User = require('../models/User');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    req.session.user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      profileImage: user.profileImage
    };
    req.session.userId = user._id;

    await req.session.save();

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, gender, password, confirmPassword } = req.body;

    if (!firstName || !email || !phone || !gender || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'All required fields must be filled'
      });
    }

    if (password.length < 4) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 4 characters long'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Passwords do not match'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address'
      });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Phone number must be 10 digits'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      gender,
      password: hashedPassword
    });

    await newUser.save();

    res.json({
      success: true,
      message: 'Signed up successfully! Please login.'
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again later.'
    });
  }
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Error logging out'
      });
    }
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });
};

const checkSession = async (req, res) => {
  if (req.session.user) {
    res.json({
      success: true,
      user: {
        id: req.session.user._id,
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        email: req.session.user.email,
        phone: req.session.user.phone,
        gender: req.session.user.gender,
        profileImage: req.session.user.profileImage
      }
    });
  } else {
    res.json({
      success: false,
      message: 'Not logged in'
    });
  }
};

const getProfile = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        profileImage: user.profileImage,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    const { firstName, lastName, phone, gender } = req.body;
    const user = await User.findById(req.session.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;

    await user.save();

    req.session.user = {
      ...req.session.user,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      gender: user.gender
    };

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        profileImage: user.profileImage,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    user.profileImage = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    };

    await user.save();

    req.session.user.profileImage = user.profileImage;
    await req.session.save();

    res.json({
      success: true,
      message: 'Profile image updated successfully',
      profileImage: user.profileImage
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

const getProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user && user.profileImage && user.profileImage.data) {
      res.set('Content-Type', user.profileImage.contentType);
      return res.send(user.profileImage.data);
    }
    res.status(404).send("No profile image found");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading image");
  }
};

module.exports = {
  login,
  signup,
  logout,
  checkSession,
  getProfile,
  updateProfile,
  uploadProfileImage,
  getProfileImage
};
