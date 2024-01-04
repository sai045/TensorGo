const authController = require("../controllers/authController");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/callback", authController.authenticateGoogle);

module.exports = router;
