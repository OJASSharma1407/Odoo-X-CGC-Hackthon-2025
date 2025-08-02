const { google } = require('googleapis');

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

module.exports = { oAuth2Client, google };
