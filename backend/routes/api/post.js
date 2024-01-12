const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { Journal } = require('../../db/models')
const router = express.Router();

// Get all post from a single user
router.get("/", requireAuth, async (req, res) => {

    const allJournals = await Journal.findAll({
        where: {
            user_id: req.user.id
        }
    });

    res.status(200).json(allJournals);

})

// Creates a post
router.post("/", requireAuth, async (req, res) => {

    // Destrcture the body request from form
    const { title, description, journal_image } = req.body;

    const journal = await Journal.create({
        title,
        description,
        journal_image,
        user_id: req.user.id
    })

    res.status(201).json(journal)

})

module.exports = router;
