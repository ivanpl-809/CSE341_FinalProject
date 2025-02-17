const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Load environment variables
require('dotenv').config();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_random_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Mongoose connected through MongoDB!'))
  .catch((err) => console.error('Cannot connect to Mongodb', err));

// Passport GitHub OAuth2 strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => done(null, profile)
  )
);

// Passport serialization
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Routes
app.use('/', require('./routes'));

// GitHub OAuth login route
app.get('/auth/github', passport.authenticate('github'));

// GitHub OAuth callback route
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));