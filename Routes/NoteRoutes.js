import express from "express";
import {
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote,
} from "../Controllers/NoteControllers.js";
import { paginate } from "../MiddleWare/Pagination.js";

const noteRoutes = express.Router();

noteRoutes.get("/", paginate, getAllNotes);
noteRoutes.get("/note/:id", getOneNote);
noteRoutes.post("/", createNote);
noteRoutes.patch("/", updateNote);
noteRoutes.delete("/", deleteNote);

export default noteRoutes;
