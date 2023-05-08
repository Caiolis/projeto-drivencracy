import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";
import dotenv from "dotenv";

// Server configuration
const app = express();

// App Configs
app.use(cors());
app.use(express.json());
app.use(router);
dotenv.config();

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
