import request from "supertest";
import app from "../server";
import Note from "../Models/NoteModel";

describe("DELETE /notes", () => {
  it("deletes a note and returns success message", async () => {
    const newNote = await Note.create({
      title: "Test Note",
      content: "This is a test note",
    });

    const response = await request(app)
      .delete(`/notes`)
      .send({ id: newNote._id });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Note deleted successfully" });

    const deletedNote = await Note.findById(newNote._id);
    expect(deletedNote).toBeNull();
  });

  it("returns an error if the note ID is invalid", async () => {
    const response = await request(app)
      .delete(`/notes`)
      .send({ id: "invalid_id" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });
  });
});
