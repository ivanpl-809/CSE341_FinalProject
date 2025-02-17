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
      clientID: 'Ov23liy3wu8XUfbhs8Ui', // Replace with your GitHub OAuth App Client ID
      clientSecret: '78f2956b0853614bf1bcbd4967944dbef97ee543', // Replace with your GitHub OAuth App Client Secret
      callbackURL: 'https://cse341-finalproject-bcvb.onrender.com/auth/github/callback', // Replace with your callback URL
    },
    (accessToken, refreshToken, profile, done) => {
      // Save user profile or create a new user in your database
      return done(null, profile);
    }
  )
);