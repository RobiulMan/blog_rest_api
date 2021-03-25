const mongoose = require("mongoose");
//note data schema
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, "title is must be 3 chracter long"],
      maxlength: [20, "title is must be less than 20 chractor"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minlength: [10, "description is must be 10 chracter long"],
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", notesSchema);
module.exports = Note;
