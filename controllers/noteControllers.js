//models
const Note = require("../models/notes");
//express-validation
const { validationResult } = require("express-validator");

//Adding Note
const addController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }
  try {
    const note = new Note({
      ...req.body,
      owner: req.user._id,
    });
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

//getting single note
const getNoteController = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return res.status(404).send(errors.array());
  }

  try {
    const id = req.params.noteId;
    const getNote = await Note.findById(id).populate("owner");
    if (!getNote) {
      return res.status(400).send("there are no note");
    }
    res.send(getNote);
  } catch (err) {
    res.status(500).send(err);
  }
};
//updating note
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
    const note = await Note.findOneAndUpdate(
      {
        _id: id,
        owner: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!note) return res.status(404).send("Note not Found");
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
};

//delete note
const deleteNoteController = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return res.status(404).send(errors.array());
  }
  try {
    const id = req.params.noteId;
    const note = await Note.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!note) return res.status(404).send("Note not found");
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
};


module.exports = {
  addController,
  getNotesController,
  getNoteController,
  updateNoteController,
  deleteNoteController,
};
