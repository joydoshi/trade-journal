const express = require("express");
const router = express.Router();
const passport = require("passport");

const Journal = require("../../models/Journal");
// Load input validation
const validateJournalInput = require("../../validation/journal");

// @route GET api/journals
// @desc Get all journals for a specific user
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let journalsArr = [];

    // Member journals
    await Journal.find({})
      .then(journals => {
        journals.map(journal => {
          journal.teamMembers.map(member => {
            if (member.email == req.user.email) {
              journalsArr.push(journal);
            }
          });
        });
      })
      .catch(err => console.log(err));

    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    // Combine with owner journals
    await Journal.find({ owner: OWNER })
      .then(journals => {
        let finalArr = [...journals, ...journalsArr];
        res.json(finalArr);
      })
      .catch(err => console.log(err));
  }
);

// @route GET api/journals/:id
// @desc Get specific journal by id
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;

    Journal.findById(id).then(journal => res.json(journal));
  }
);

// @route POST api/journals/create
// @desc Create a new journal
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {

  // Form validation

  const { errors, isValid } = validateJournalInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
 //     stock: req.user.stock
    };

    const NEW_JOURNAL = await new Journal({
      owner: OWNER,
      name: req.body.journalName,
      stock: req.body.stock,
      action: req.body.action,
      stockquantity: req.body.stockquantity,
      startingprice: req.body.startingprice,
      stoploss: req.body.stoploss,
      targetprice: req.body.targetprice,
      reasonfortrade: req.body.reasonfortrade,
      closingprice: req.body.closingprice,
      reasonforexit: req.body.reasonforexit,
      emotionalstate: req.body.emotionalstate,
      teamMembers: req.body.members
    });

    NEW_JOURNAL.save().then(journal => res.json(journal));
  }
);

// @route PATCH api/journals/update
// @desc Update an existing journal
// @access Private
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let journalFields = {};

    journalFields.name = req.body.journalName;
    journalFields.stock = req.body.stock;
    journalFields.action = req.body.action;
    journalFields.stockquantity = req.body.stockquantity;
    journalFields.startingprice = req.body.startingprice;
    journalFields.stoploss = req.body.stoploss;
    journalFields.targetprice = req.body.targetprice;
    journalFields.reasonfortrade = req.body.reasonfortrade;
    journalFields.closingprice = req.body.closingprice;
    journalFields.reasonforexit = req.body.reasonforexit;
    journalFields.emotionalstate = req.body.emotionalstate;
    journalFields.teamMembers = req.body.members;

    Journal.findOneAndUpdate(
      { _id: req.body.id },
      { $set: journalFields },
      { new: true }
    )
      .then(journal => {
        res.json(journal);
      })
      .catch(err => console.log(err));
  }
);

// @route DELETE api/journals/delete/:id
// @desc Delete an existing journal
// @access Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Journal.findById(req.params.id).then(journal => {
      journal.remove().then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;
