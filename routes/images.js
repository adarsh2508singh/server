const multer = require("multer");
const fs = require("fs");
const express = require("express");
const router = express.Router();
require('dotenv').config();
const { MongoClient, GridFSBucket } = require("mongodb");
const databaseUrl=process.env.DATABASE_URL;


const upload = multer({ dest: "uploads/" });
router.post("/photo", upload.single("testImage"), async (req, res) => {
  try {
    const client = await MongoClient.connect(databaseUrl);
    const db = client.db("car");
    const bucket = new GridFSBucket(db);
    const uploadStream = bucket.openUploadStream(req.file.originalname);
    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(uploadStream);
    uploadStream.on("finish", () => {
      fs.unlink(req.file.path, () => {
        // retrieve the saved file from GridFSBucket and send it as a response
        const downloadStream = bucket.openDownloadStreamByName(
          req.file.originalname
        );
        res.set("Content-Type", req.file.mimetype);
        downloadStream.pipe(res);
        downloadStream.on("end", () => {
          client.close();
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;