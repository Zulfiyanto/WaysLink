//instantiate express module here
const express = require("express");
const multer = require("multer");
const { Register, Login, checkAuth } = require("../controllers/Auth");
const { AddBrands, GetBrands, DeleteBrand, GetBrand } = require("../controllers/Brands");
const { GetUser, UpdateUser, DeleteUser } = require("../controllers/user");
const { auth } = require("../middlewares/Auth");
const { uploadFile } = require("../middlewares/UploadFiles");
// Init express router here..
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
  },
});

const upload = multer({
  storage,
});

// Auth Router
router.post("/register", Register);
router.post("/login", Login);
router.get("/check-auth", auth, checkAuth);

// Brand Router
router.post("/brand", auth, upload.any("image"), AddBrands);
router.get("/brands", auth, GetBrands);
router.delete("/brand/:id", auth, DeleteBrand);
router.get("/brand/:unique_link", auth, GetBrand);

// User Router
router.get("/user/:id", auth, GetUser);
router.patch("/user/:id", auth, UpdateUser);
router.delete("/user/:id", auth, DeleteUser);

module.exports = router;
