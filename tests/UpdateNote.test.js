import request from "supertest";
import app from "../server";

describe("Patch /notes", () => {
  it("responds with JSON containing the updated note", async () => {
    const response = await request(app).patch("/notes").send({
      _id: 123,
      title: "updated title",
      content: "updated content",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "updated title");
    expect(response.body).toHaveProperty("content", "updated content");
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
  });
});
