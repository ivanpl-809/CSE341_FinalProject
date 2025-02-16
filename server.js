const express = require('express'); // Import express
const app = express(); // Initialize express
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const User = require('./models/userModel');
const swaggerSetup = require('./swagger');

// Load environment variables
require('dotenv').config();

const port = process.env.PORT || 3000; // Port number

// Middleware
app.use(bodyParser.json());
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
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongoose connected through MongoDB!');
  })
  .catch((err) => {
    console.error('Cannot connect to Mongodb', err);
  });

// Passport GitHub OAuth2 strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ UserName: profile.username });
      if (!user) {
        user = new User({
          Email: `${profile.username}@github.com`,
          FirstName: profile.displayName || 'Unknown',
          LastName: profile.displayName || 'User',
          UserName: profile.username,
          AccountType: 'admin',
          PhoneNumber: '8005551212',
        });
        await user.save();
      }
      return done(null, profile);
    }
  )
);

// Passport serialization
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.use('/', require('./routes'));

// Home route
app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as user ${req.session.user.displayName || req.session.user.username}`
      : 'Logged Out'
  );
});

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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});