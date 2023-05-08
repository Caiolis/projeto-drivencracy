import express from "express";
import cors from 'cors';
import router from "./routes/index.routes.js";

// Server configuration
const app = express();
const PORT = 5000;

// App Configs
app.use(cors());
app.use(express.json());
app.use(router)

app.listen(PORT, () => console.log(`listening on port ${PORT}`));