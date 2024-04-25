import Note from "../Models/NoteModel.js";

// Get All Notes
export const getAllNotes = async (req, res) => {
  try {
    const { search } = req.query;

    let notes;

    // if (search) {
    //   const searchTerm = search.toLowerCase();
    //   const filter = { title: { $regex: searchTerm, $options: "i" } };
    //   notes = await Note.find(filter).sort({ createdAt: -1 });
    // } else {
    //   notes = await Note.find().sort({ createdAt: -1 });
    // }

    if (search) {
      const searchTerm = search.toLowerCase().trim();
      if (searchTerm) {
        const filter = { title: { $regex: searchTerm, $options: "i" } };
        notes = await Note.find(filter).sort({ createdAt: -1 });
      } else {
        notes = [];
      }
    } else {
      notes = await Note.find().sort({ createdAt: -1 });
    }

    const noteCount = notes.length;

    const { offset, limit } = req;

    notes = notes.slice(offset, offset + limit);

    return res.status(201).json({ notes, noteCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get one Note
export const getOneNote = async (req, res) => {
  const id = req.params.id;

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(401).json({ error: "Note not found" });
    }
    return res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a Note
export const createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({ error: "All fiels are required" });
    }

    const newNote = await Note.create({
      title,
      content,
    });
    return res.status(200).json(newNote);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Update a Note
export const updateNote = async (req, res) => {
  const id = req.body.id;
  const { title, content } = req.body;

  try {
    const existingNote = await Note.findById(id);

    if (title) existingNote.title = title;
    if (content) existingNote.content = content;

    await existingNote.save();
    return res.status(200).json(existingNote);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};

//Delete a Note
export const deleteNote = async (req, res) => {
  const id = req.body.id;

  // console.log(id)

  try {
    const existingNote = await Note.findById(id);

    await Note.deleteOne({ _id: id });
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
