const express = require('express'); // Import express
const app = express(); // Initialize express
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const bodyParser = require('body-parser');

// SWAGGER
require('./swagger');

app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
  })
);

const cors = require('cors');
app.use(cors());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const port = process.env.PORT || 3000; // Port number
//app.use('/', routes)


// DATA
const models = require('./models');
const utils = require('./utils');
models.db.mongoose
  .connect(utils.url, {})
  .then(() => {console.log('Mongoose connected through MongoDB!');})
  .catch((err) => {
    console.error('Cannot connect to Mongodb', err);
  });

// APP
app
  .use(bodyParser.json())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes'))
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth Routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to home or a protected route
    res.redirect('/');
  }
);

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

// Example of protecting routes
app.post('/parts', ensureAuthenticated, (req, res) => {
  // Your route logic here
});

app.put('/parts/:partsId', ensureAuthenticated, (req, res) => {
  // Your route logic here
});