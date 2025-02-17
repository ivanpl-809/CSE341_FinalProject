const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const port = process.env.PORT || 3000;

// Session setup
app.use(
  session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // You can save the user profile to your database here if needed
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// GitHub OAuth routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to home or a protected route
    res.redirect('/');
  }
);

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized. Please log in with GitHub.' });
};

// Apply authentication middleware to POST and PUT routes
app.use('/parts', isAuthenticated);
app.use('/user', isAuthenticated);
app.use('/vehicle', isAuthenticated);
app.use('/aftermarketComp', isAuthenticated);
app.use('/brands', isAuthenticated);

// DATA
const models = require('./models');
const utils = require('./utils');
models.db.mongoose
  .connect(utils.url, {})
  .then(() => {
    console.log('Mongoose connected through MongoDB!');
  })
  .catch((err) => {
    console.error('Cannot connect to Mongodb', err);
  });

// APP
app
  .use(bodyParser.json())
  .use(cors())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes'))
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });