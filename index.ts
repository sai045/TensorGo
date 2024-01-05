import { Operators } from "intercom-client";

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Profile = require("passport-google-oauth20").Profile;
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Intercom = require("intercom-client");
const client = new Intercom.Client({
  tokenAuth: {
    token: process.env.INTERCOM_TOKEN,
  },
});

const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

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

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req: any, res: any) => {
    const existingUser = await client.contacts.search({
      data: {
        query: {
          field: "email",
          operator: Operators.EQUALS,
          value: req.user._json.email,
        },
      },
    });
    console.log(existingUser);
    if (existingUser.total_count == 0) {
      const user = await client.contacts.createUser({
        email: req.user._json.email,
        name: req.user.displayName,
      });
    }
    res.redirect("http://localhost:3000/profile");
  }
);

app.get("/logout", (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    req.logout((err: any) => {
      if (err) {
        console.error(err);
        return res.json({ error: err });
      } else {
        return res.json({ operation: true });
      }
    });
  }
});

app.get("/profile", ensureAuthenticated, (req: any, res: any) => {
  res.send(req.user);
});

function ensureAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

app.post("/complaint", async (req: any, res: any) => {
  console.log(req.body);
  const { userId, complaint } = req.body;
  const response = await client.conversations
    .create({
      userId,
      body: complaint,
    })
    .then((response: any) => console.log(response))
    .catch((err: any) => console.log(err));
});

app.post("/getAllComplaintsById", async (req: any, res: any) => {
  const response = await client.conversations.search({
    data: {
      query: {
        field: "contact_ids",
        operator: Operators.EQUALS,
        value: req.body.userId,
      },
    },
  });
  console.log(response);
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
