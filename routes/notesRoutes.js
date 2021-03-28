const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

//Middleware auth
const { auth } = require("../middleware/auth");

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
  "/",
  [
    auth,
    body("title", "title is Required").notEmpty(),
    body("description", "description is Required").notEmpty(),
  ],
  getAddController
);

//get all notes
router.get("/", getNotesController);

//get single note
router.get(
  "/:noteId",
  [auth, body("noteId", "Note Not Found").isMongoId()],
  getNoteController
);

//update note
router.put(
  "/:noteId",
  [
    auth,
    body("noteId", "Note not found").isMongoId(),
    body("title", "title is required").optional().notEmpty(),
    body("description", "description is required").optional().notEmpty(),
  ],
  updateNoteController
);

//delete note
router.delete(
  "/:noteId",
  [auth, body("noteId", "Note not found").isMongoId()],
  deleteNoteController
);

module.exports = router;
