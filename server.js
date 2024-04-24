import express from "express";
import dotenv from "dotenv";
import connect from "./config/config.js";
import noteRoutes from "./Routes/NoteRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 6666;
const app = express();
app.use(express.json());

app.use("/notes", noteRoutes);

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);

  if (PORT === 6666) {
    ("ERROR: issue reading port from process.env. Continue with caution! ...");
  }
});
