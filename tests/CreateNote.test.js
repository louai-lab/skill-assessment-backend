import request from "supertest";
import app from "../server.js";

describe("POST /notes", () => {
  it("responds with JSON containing created note", async () => {
    const response = await request(app).post("/notes").send({
      title: "title",
      content: "content",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "title");
    expect(response.body).toHaveProperty("content", "content");
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
  });
});
