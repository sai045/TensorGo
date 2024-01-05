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

const createUser = async (email: string, name: string) => {
  const user = await clientAuth.contacts.createUser({
    email,
    name,
  });
};

const callbackController = async (req: any, res: any) => {
  console.log("1");
  const existingUser: any = await searchUser(req.user._json.email);
  console.log(existingUser);
  if (existingUser.total_count == 0) {
    await createUser(req.user._json.email, req.user.displayName);
  }
  console.log("ofje");
  res.redirect("http://localhost:3000/profile");
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

exports.callbackController = callbackController;
exports.logout = logout;
