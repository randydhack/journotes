const express = require("express");
const { requireAuth } = require("../../utils/auth");

const { Journal } = require("../../db/models");
const router = express.Router();

import crypto from "crypto";

// AWS and S3 imports
import multer from "multer";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// AWS environment variables
const BUCKET_NAME = process.env.S3_BUCKET;
const BUCKET_REGION = process.env.S3_REGION;
const ACCESS_KEY = process.env.S3_ACCESS_KEY;
const SECRET_KEY = process.env.S3_SECRET_KEY;

const randomImageName = (bytes = 32) => {
  crypto.randomBytes(bytes).toString("hex");
};

const s3 = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
  region: BUCKET_REGION,
});

// Get all journal from a single user
router.get("/", requireAuth, async (req, res) => {
  const allJournals = await Journal.findAll({
    where: {
      user_id: req.user.id,
    },
  });

  for (const journal of allJournals) {
    const getObjectParams = {
      Bucket: BUCKET_NAME,
      Key: journal.imageUrl,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    journal.imageUrl = url;
  }

  res.status(200).json(allJournals);
});

// Get a journal by id from a single user
router.get("/:id", requireAuth, async (req, res, next) => {
  // Find journal by id
  const journal = await Journal.findByPk(req.params.id);

  if (journal.private && journal.user_id !== req.user.id) {
    const err = new Error("User does not have permission to view journal.");
    err.status = 404;
    return next(err);
  }

  res.status(200).json(journal);
});

// Creates a journal
router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  // Destrcture the body request from form
  const { title, description, imageUrl } = req.body; // CHECK IF THIS WORKS WIT IMAGES
  const imageName = randomImageName();

  const params = {
    Bucket: BUCKET_NAME,
    Key: imageName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);

  await s3.send(command);

  const journal = await Journal.create({
    title,
    description,
    imageUrl: imageName,
    user_id: req.user.id,
  });

  res.status(201).json(journal);
});

// Edit a journal by id
router.put("/:id", requireAuth, upload.single("image"), async (req, res, next) => {
  // Body request
  const { title, description, imageUrl } = req.body;

  // Find journal by id and user id
  const journal = await Journal.findOne({
    where: { id: req.params.id, user_id: req.user.id },
  });

  // throws an error if the journal doesn't exist
  if (!journal) {
    const err = new Error("Journal does not exist.");
    err.status = 404;
    return next(err);
  }

  // updates the three fields
  await journal.update({ title, description, imageUrl });

  res.status(200).json(journal);
});

// Delete journal by id
router.delete("/:id", requireAuth, async (req, res, next) => {
  // finds the journal by id
  const journal = await Journal.findByPk(req.params.id);

  if (!journal) {
    const err = new Error("Journal does not exist.");
    err.status = 404;
    return next(err);
  }

  if (journal.user_id !== req.user.id) {
    const err = new Error("Journal does not belong to you.");
    err.status = 404;
    return next(err);
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: journal.imageUrl,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);
  await journal.destroy();

  res.status(200).json("Journal has been successfully delete.");
});

module.exports = router;
