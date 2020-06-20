const express = require("express");
const router = express.Router();

const Contact = require("../../models/Contact");
const multer = require("multer");
//save image in node server

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadsContact/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  //   fileFilter: (req, file, cb) => {
  //     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
  //       cb(null, true);
  //     }
  //     return cb(null, false, new Error("fjzefzfze"));
  //   },
});

var upload = multer({ storage: storage }).single("file");

router.post("/uploadFile", (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
