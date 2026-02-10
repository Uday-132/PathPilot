const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Streak Logic
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        let lastLoginDate = null;
        if (user.lastLogin) {
            const last = new Date(user.lastLogin);
            lastLoginDate = new Date(last.getFullYear(), last.getMonth(), last.getDate());
        }

        if (!lastLoginDate) {
            // First time login ever (or since update)
            user.streak = 1;
        } else {
            const diffTime = Math.abs(today - lastLoginDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Logged in yesterday -> Increment streak
                user.streak += 1;
            } else if (diffDays > 1) {
                // Missed a day -> Reset streak
                user.streak = 1;
            }
            // If diffDays === 0 (logged in earlier today), keep streak same
        }

        user.lastLogin = now;
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    streak: user.streak,
                    achievements: user.achievements
                }
            });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// Update User Profile (Goals)
router.put('/profile', require('../middleware/auth'), async (req, res) => {
    console.log('PUT /profile hit'); // Debug
    console.log('Headers:', req.headers['x-auth-token']); // Debug - check token
    console.log('Body:', req.body); // Debug - check data

    const { careerGoal, skillLevel, targetOutcome, availability } = req.body;

    // Build profile object
    const profileFields = {};
    if (careerGoal) profileFields.careerGoal = careerGoal;
    if (skillLevel) profileFields.skillLevel = skillLevel;
    if (targetOutcome) profileFields.targetOutcome = targetOutcome;
    if (availability) profileFields.availability = availability;

    console.log('Profile Fields to Update:', profileFields); // Debug

    try {
        let user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: profileFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;