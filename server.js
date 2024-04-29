import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./config/config.js";
import noteRoutes from "./Routes/NoteRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 6666;
const app = express();
app.use(express.json());

const corsOption = {
  origin: process.env.FRONT_END_PATH,
  Credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

app.use("/notes", noteRoutes);

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);

  if (PORT === 6666) {
    ("ERROR: issue reading port from process.env. Continue with caution! ...");
  }
});

export default app;