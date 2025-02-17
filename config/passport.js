const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: 'YOUR_GITHUB_CLIENT_ID', // Replace with your GitHub OAuth App Client ID
      clientSecret: 'YOUR_GITHUB_CLIENT_SECRET', // Replace with your GitHub OAuth App Client Secret
      callbackURL: 'http://localhost:3000/auth/github/callback', // Replace with your callback URL
    },
    (accessToken, refreshToken, profile, done) => {
      // Save user profile or create a new user in your database
      return done(null, profile);
    }
  )
);