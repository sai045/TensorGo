const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Profile = require("passport-google-oauth20").Profile;
require("dotenv").config();
console.log(process.env);
const app = express();
const authRoutes = require("./routes/authRoutes");
const ensureAuthenticated = require("./middleware/authMiddleware");

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done: any) => {
  done(null, obj);
});

app.use("/auth", authRoutes);

app.get("/logout", (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    req.logout((err: any) => {
      if (err) {
        console.error(err);
        return res.redirect("/");
      }
      res.redirect("/");
    });

    return res.redirect("/");
  }

  next();
});

app.get("/profile", ensureAuthenticated, (req: any, res: any) => {
  res.send(req.user);
  console.log(req.user);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
