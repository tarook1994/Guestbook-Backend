const express = require("express");
const router = express.Router();
const guestbookController = require("../controllers/guestbookController");
const validator = require("../middleware/validator");
const auth = require("../middleware/auth");

router.post(
  "/guestbook/add-message",
  auth,
  validator.validationForCreateMessage(),
  validator.validate,
  guestbookController.addMessage
);
// router.get("/guestbook/all", auth, userController.getUserProfile);
// router.put("/guestbook/:id", auth, userController.changePassword);
// router.delete("/guestbook/:id", auth, userController.logout);

module.exports = router;
