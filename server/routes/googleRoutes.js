// routes/googleRoutes.js
const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const oAuth2Client = require('../config/googleAuth');

// Redirect user to Google for login
router.get('/google', (req, res) => {
    const scopes = ['https://www.googleapis.com/auth/calendar'];
    const url = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    res.redirect(url);
});

// Handle Google callback and get tokens
router.get('/oauth2callback', async (req, res) => {
    const code = req.query.code;
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Optional: Save tokens to DB
    res.send('Google Calendar connected!');
});

// Add task to Google Calendar
router.post('/add-to-calendar', async (req, res) => {
    const { summary, description, startTime, endTime } = req.body;
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    const event = {
        summary,
        description,
        start: { dateTime: startTime, timeZone: 'Asia/Kolkata' },
        end: { dateTime: endTime, timeZone: 'Asia/Kolkata' }
    };

    try {
        await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });
        res.send('Task added to Google Calendar!');
    } catch (err) {
        res.status(500).json({ error: 'Failed to add task to calendar' });
    }
});

module.exports = router;
