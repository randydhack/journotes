const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const router = express.Router();

// Get all post from a single user
router.get("/", requireAuth, async (req, res) => {

    console.log('res')
    res.json('hello')
})

module.exports = router;
