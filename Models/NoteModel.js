import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 30,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

NoteSchema.index({ createdAt: -1 });

const Note = mongoose.model("Note", NoteSchema);

export default Note;
