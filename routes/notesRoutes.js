const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

//contorller require from noteController
const {
  getAddController,
  getNotesController,
  getNoteController,
  updateNoteController,
  deleteNoteController,
} = require("../controllers/noteControllers");

//Adding Note
router.post(
  "/notes",
  [
    body("title", "title is Required").notEmpty(),
    body("description", "description is Required").notEmpty(),
  ],
  getAddController
);

//get all notes
router.get("/notes", getNotesController);

//get single note
router.get(
  "/notes/:noteId",
  body("noteId", "Note Not Found").isMongoId(),
  getNoteController
);

//update note
router.put(
  "/notes/:noteId",
  [
    body("noteId", "Note not found").isMongoId(),
    body("title", "title is required").optional().notEmpty(),
    body("description", "description is required").optional().notEmpty(),
  ],
  updateNoteController
);

//delete note
router.delete(
  "/notes/:noteId",
  body("noteId", "Note not found").isMongoId(),
  deleteNoteController
);

module.exports = router;
