import { Operators } from "intercom-client";

const IntercomAuth = require("intercom-client");
const clientAuth = new IntercomAuth.Client({
  tokenAuth: {
    token: process.env.INTERCOM_TOKEN,
  },
});

const searchUser = async (email: string) => {
  const existingUser = await clientAuth.contacts.search({
    data: {
      query: {
        field: "email",
        operator: Operators.EQUALS,
        value: email,
      },
    },
  });
  return existingUser;
};

const createUser = async (email: string, name: string, photo: string) => {
  const user = await clientAuth.contacts.createUser({
    email,
    name,
    custom_attributes: { photo },
  });
};

const callbackController = async (req: any, res: any) => {
  const existingUser: any = await searchUser(req.user._json.email);
  if (existingUser.total_count == 0) {
    await createUser(
      req.user._json.email,
      req.user.displayName,
      req.user.photos[0].value
    );
  }
  res.redirect(`http://localhost:3000/?email=${req.user._json.email}`);
};

const logout = async (req: any, res: any) => {
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
};

const getUser = async (req: any, res: any) => {
  const existingUser = await clientAuth.contacts.search({
    data: {
      query: {
        field: "email",
        operator: Operators.EQUALS,
        value: req.body.email,
      },
    },
  });
  res.status(200).json({ existingUser });
};

const getUserById = async (req: any, res: any) => {
  const { id } = req.body;
  const existingUser = await clientAuth.contacts.find({ id });
  res.status(200).json({ existingUser });
};

exports.callbackController = callbackController;
exports.logout = logout;
exports.getUser = getUser;
exports.getUserById = getUserById;
