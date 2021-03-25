//models
const Note = require("../models/notes");
//express-validation
const { validationResult } = require("express-validator");

const getAddController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }
  try {
    const note = new Note(req.body);
    await note.save();
    res.send(note);
  } catch (err) {
    res.status(400).send("Something failed in server or data cant't be saved");
  }
};

const getNotesController = async (req, res) => {
  try {
    const notes = await Note.find();
    if (notes.length < 1)
      return res.status(404).send("not any note available in database...");
    res.send(notes);
  } catch (err) {
    res.status(500).send(err);
  }
};
const getNoteController = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return res.status(404).send(errors.array());
  }

  try {
    const id = req.params.noteId;
    const getNote = await Note.findById(id);
    if (!getNote) {
      return res.status(400).send("there are no note");
    }
    res.send(getNote);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateNoteController = async (req, res) => {
  const getNoteInput = Object.keys(req.body);
  const allowedUpdate = ["title", "description"];
  const isAllowed = getNoteInput.every((update) =>
    allowedUpdate.includes(update)
  );
  if (!isAllowed) return res.status(404).send("Invalid updates");
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return res.sataus(404).send(errors.array());
  }
  try {
    const id = req.params.noteId;
    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) return res.status(404).send("Note not Found");
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
};
const deleteNoteController = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return res.status(404).send(errors.array());
  }
  try {
    const id = req.params.noteId;
    const note = await Note.findByIdAndDelete(id);
    if (!note) return res.status(404).send("Note not found");
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = {
  getAddController,
  getNotesController,
  getNoteController,
  updateNoteController,
  deleteNoteController,
};
