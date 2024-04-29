import request from "supertest";
import app from "../server.js";

describe("Get /notes", () => {
  it("responds with JSON containing paginated notes (with default pagination)", async () => {
    const pageNumber = 1;
    const pageSize = 4;

    const response = await request(app)
      .get("/notes")
      .query({ pageNumber, pageSize });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("notes");
    expect(Array.isArray(response.body.notes)).toBe(true);
    expect(response.body.notes.length).toBe(pageSize);
    expect(response.body).toHaveProperty("noteCount");
    expect(typeof response.body.noteCount).toBe("number");

    expect(response.body.noteCount).toBeGreaterThanOrEqual(0);
    expect(response.body.notes.length).toBeLessThanOrEqual(pageSize);
  });

  it("responds with JSON containing filtered and paginated notes when search term is provided", async () => {
    const pageNumber = 1;
    const pageSize = 4;
    const searchTerm = "example";

    const response = await request(app)
      .get("/notes")
      .query({ pageNumber, pageSize, search: searchTerm });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("notes");
    expect(Array.isArray(response.body.notes)).toBe(true);

    response.body.notes.forEach((note) => {
      expect(note.title.toLowerCase()).toContain(searchTerm.toLowerCase());
    });

    expect(response.body).toHaveProperty("noteCount");
    expect(typeof response.body.noteCount).toBe("number");
    expect(response.body.noteCount).toBeGreaterThanOrEqual(0);
    expect(response.body.notes.length).toBeLessThanOrEqual(pageSize);
  });

  it("responds with an empty list of notes when no search term matches", async () => {
    const pageNumber = 1;
    const pageSize = 4;
    const nonMatchingSearchTerm = "nonexistent";

    const response = await request(app)
      .get("/notes")
      .query({ pageNumber, pageSize, search: nonMatchingSearchTerm });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("notes");
    expect(Array.isArray(response.body.notes)).toBe(true);
    expect(response.body.notes.length).toBe(0);

    expect(response.body).toHaveProperty("noteCount");
    expect(response.body.noteCount).toBe(0);
  });
});
