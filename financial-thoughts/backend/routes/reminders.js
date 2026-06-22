const express = require("express");
const Reminder = require("../models/Reminder");
const { ensureLoggedIn } = require("../middleware/auth");

const router = new express.Router();

router.get("/", ensureLoggedIn, async function(req,res,next){

  try{

    const reminders =
      await Reminder.findAll(req.user.id);

    return res.json({ reminders });

  } catch(err){
    return next(err);
  }

});

router.post("/", ensureLoggedIn, async function(req,res,next){

  try{

    const reminder =
      await Reminder.create({

        userId: req.user.id,

        title: req.body.title,

        description: req.body.description,

        dueDate: req.body.dueDate

      });

    return res.status(201).json({ reminder });

  } catch(err){
    return next(err);
  }

});

router.put("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const reminder = await Reminder.update(
      req.params.id,
      req.user.id,
      req.body
    );

    return res.json({ reminder });

  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", ensureLoggedIn, async function(req,res,next){

  try{

    await Reminder.remove(
      req.params.id,
      req.user.id
    );

    return res.json({
      deleted: Number(req.params.id)
    });

  } catch(err){
    return next(err);
  }

});

module.exports = router;