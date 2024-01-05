const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const ensureAuthenticated =
  require("./middleware/ensureAuthentication").isAuthenticated;
const Intercom = require("intercom-client");

const client = new Intercom.Client({
  tokenAuth: {
    token: process.env.INTERCOM_TOKEN,
  },
});

const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/authRoutes"));
app.use("/complaint", require("./routes/complaintRoutes"));

app.get("/profile", ensureAuthenticated, (req: any, res: any) => {
  res.send(req.user);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
