const expressComp = require("express");
const complaintController = require("../controllers/complaintController");
const ensureAuthenticated =
  require("../middleware/ensureAuthentication").isAuthenticated;

const routerComp = expressComp.Router();

routerComp.post(
  "/createComplaint",
  ensureAuthenticated,
  complaintController.createComplaint
);

routerComp.post(
  "/getAllComplaintsById",
  ensureAuthenticated,
  complaintController.getAllComplaintsById
);

routerComp.post(
  "/getComplaint",
  ensureAuthenticated,
  complaintController.getComplaint
);

module.exports = routerComp;
