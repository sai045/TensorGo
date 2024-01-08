import { Operators } from "intercom-client";

const IntercomComp = require("intercom-client");
const clientComp = new IntercomComp.Client({
  tokenAuth: {
    token: process.env.INTERCOM_TOKEN,
  },
});

const createComplaint = async (req: any, res: any) => {
  const { userId, comments, catagory } = req.body;
  const response = await clientComp.conversations
    .create({
      userId,
      body: JSON.stringify({ comments, catagory }),
    })
    .then((response: any) => {
      res.status(200).json({ message: "Complaint created" });
    })
    .catch((err: any) => {
      res.status(500).json({ error: err });
    });
};

const getAllComplaintsById = async (req: any, res: any) => {
  const response = await clientComp.conversations
    .search({
      data: {
        query: {
          field: "contact_ids",
          operator: Operators.EQUALS,
          value: req.body.userId,
        },
      },
    })
    .then((response: any) => {
      res.status(200).json({ complaints: response });
    })
    .catch((err: any) => res.status(404).json({ err }));
};

const getComplaint = async (req: any, res: any) => {
  const { id } = req.body;
  const response = await clientComp.conversations
    .find({ id })
    .then((response: any) => res.status(200).json({ response }))
    .catch((err: any) => {
      res.status(404).json(err);
    });
};

exports.createComplaint = createComplaint;
exports.getAllComplaintsById = getAllComplaintsById;
exports.getComplaint = getComplaint;
