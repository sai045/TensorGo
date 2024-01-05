import { Operators } from "intercom-client";

const IntercomComp = require("intercom-client");
const clientComp = new IntercomComp.Client({
  tokenAuth: {
    token: process.env.INTERCOM_TOKEN,
  },
});

const createComplaint = async (req: any, res: any) => {
  const { userId, complaint } = req.body;
  const response = await clientComp.conversations
    .create({
      userId,
      body: complaint,
    })
    .then((response: any) => console.log(response))
    .catch((err: any) => console.log(err));
};

const getAllComplaintsById = async (req: any, res: any) => {
  const response = await clientComp.conversations.search({
    data: {
      query: {
        field: "contact_ids",
        operator: Operators.EQUALS,
        value: req.body.userId,
      },
    },
  });
  console.log(response);
};

exports.createComplaint = createComplaint;
exports.getAllComplaintsById = getAllComplaintsById;
