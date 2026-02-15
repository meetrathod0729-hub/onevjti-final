import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import connectDB from "./db/index.js";
import { app } from "./app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

console.log("CLOUDINARY KEY:", process.env.CLOUDINARY_API_KEY);

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB connection FAILED!", err);
  });
