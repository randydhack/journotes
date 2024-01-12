const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { Journal } = require('../../db/models')
const router = express.Router();

// Get all journal from a single user
router.get("/", requireAuth, async (req, res) => {

    const allJournals = await Journal.findAll({
        where: {
            user_id: req.user.id
        }
    });

    res.status(200).json(allJournals);

})

// Get a journal by id from a single user
router.get("/:id", requireAuth, async (req, res) => {
    // Find journal by id
    const journal = await Journal.findByPk(req.params.id);
    res.status(200).json(journal);
})

// Creates a journal
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

// Edit a journal by id
router.put("/:id", requireAuth, async (req, res, next) => {

    // Body request
    const { title, description, journal_image } = req.body;

    // Find journal by id and user id
    const journal = await Journal.findOne({
        where: { id: req.params.id, user_id: req.user.id }
    });

    // throws an error if the journal doesn't exist
    if (!journal) {
        const err = new Error("Journal does not exist.");
        err.status = 404;
        return next(err);
    }

    // updates the three fields
    await journal.update({title, description, journal_image});

    res.status(200).json(journal);
})

// Delete journal by id
router.delete('/:id', requireAuth, async (req, res, next) => {

    // finds the journal by id
    const journal = await Journal.findByPk(req.params.id)

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

    await journal.destroy()

    res.status(200).json("Journal has been successfully delete.")
})

module.exports = router;
