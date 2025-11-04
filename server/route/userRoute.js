const express = require("express");
const {
  getAll,
  addAddress,
  createRegister,
  loginUser,
} = require("../controller/userController");
const authenticateUser = require("../middleware/authMiddleware");
const router = express.Router();
// authenticateUser
router.get("/users/", authenticateUser, getAll);
router.put("/:id/address", authenticateUser, addAddress);
router.post("/register", createRegister);
router.post("/login", loginUser);

// loginUser

// createRegister

// router.post("/bulk", createUsers);

module.exports = router;
