const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validator = require("../middleware/validator");
const auth = require("../middleware/auth");

router.post(
  "/users/create-user",
  validator.validationForCreateUser(),
  validator.validate,
  userController.createUser
);
router.post("/users/login", userController.login);
router.get("/users/me", auth, userController.getUserProfile);
router.put("/users/me/change-password", auth, userController.changePassword);
router.post("/users/me/logout", auth, userController.logout);
router.post("/users/me/logout-all", auth, userController.logoutAll);

module.exports = router;
