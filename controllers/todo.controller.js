const express = require("express");

const todo = require("../models/todo.model");

const router = express.Router();

router.post("/todo", async (req, res) => {
  try {
    const item = await todo.create(req.body);
    return res.status(201).send(item);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get("/todo", async (req, res) => {
  try {
    const item = await todo.find().lean().exec();

    return res.status(201).send(item);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
router.get("/todo/:id", async (req, res) => {
  try {
    const item = await todo.findById(req.params.id);

    return res.status(201).send(item);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
router.delete("/todo", async (req, res) => {
  try {
    const item = await todo.deleteMany();

    return res.status(201).send(item);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
router.delete("/todo/:id", async (req, res) => {
  try {
    const item = await todo.findByIdAndRemove(req.params.id);

    return res.status(201).send(item);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
router.patch("/todo/:id", async (req, res) => {
  try {
    const item = await todo.findByIdAndUpdate(req.params.id, req.body);

    return res.status(201).send(item);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = router;
