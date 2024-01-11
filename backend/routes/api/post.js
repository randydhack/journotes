const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");


const { Post } = require('../../db/models');
const router = express.Router();

// Get all post from a single user
router.get("/post", requireAuth, async (req, res) => {

    res.json('hello')
})
