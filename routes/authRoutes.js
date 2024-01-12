const express = require("express");
const router = express.Router();
const allControllers = require("../controllers/allControllers");
const auth = require("../middleware/auth");
const multer = require("multer");

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/register",
  upload.single("image"),
  allControllers.controllers.postRegister
);
router.post("/login", allControllers.controllers.postLogin);
router.post(
  "/deleteUser/:userId",
  auth,
  allControllers.controllers.postDeleteUser
);
router.post(
  "/updateUserDetails/:userId",
  auth,
  allControllers.controllers.updateUserDetails
);
router.post(
  "/updateProfileImage/:userId",
  auth,
  upload.single("image"),
  allControllers.controllers.updateProfileImage
);
router.post(
  "/createAdmin",
  auth,
  upload.single("image"),
  allControllers.controllers.createAdmin
);
router.get("/test", auth, (req, res) => {
  res.send("request passed");
});

module.exports = router;
