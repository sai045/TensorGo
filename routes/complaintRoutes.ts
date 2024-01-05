const expressComp = require("express");
const complaintController = require("../controllers/complaintController");

const routerComp = expressComp.Router();

routerComp.post("/createComplaint", complaintController.createComplaint);

routerComp.post(
  "/getAllComplaintsById",
  complaintController.getAllComplaintsById
);

module.exports = routerComp;
