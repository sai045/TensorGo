const expressAuth = require("express");
const passportAuth = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const authController = require("../controllers/authController");

const router = expressAuth.Router();
passportAuth.use(
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

passportAuth.serializeUser((user: any, done: any) => {
  done(null, user);
});

passportAuth.deserializeUser((obj: any, done: any) => {
  done(null, obj);
});

router.get(
  "/google",
  passportAuth.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passportAuth.authenticate("google", { failureRedirect: "/" }),
  authController.callbackController
);

router.get("/logout", authController.logout);

router.post("/getUser", authController.getUser);

module.exports = router;
