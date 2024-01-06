const expressComp = require("express");
const complaintController = require("../controllers/complaintController");

const routerComp = expressComp.Router();

routerComp.post("/createComplaint", complaintController.createComplaint);

routerComp.post(
  "/getAllComplaintsById",
  complaintController.getAllComplaintsById
);

routerComp.post("/getComplaint", complaintController.getComplaint);

module.exports = routerComp;
