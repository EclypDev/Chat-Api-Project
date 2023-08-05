import Express from "express";
import Mongoose from "mongoose";
import Path from "path";
import "./database/database.js";
import { doorSchema } from "./database/Schema/Schemas.js";
import route from "./routes.js";
import morgan from "morgan";
import { fileURLToPath } from "url";

// Utils
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

// create APP
const APP = Express();

// Paths
const staticFilePath = Path.join(__dirname, "../web");

// Settings
const PORT = process.env.PORT || 3000;

// Middlewares
APP.use(morgan("dev"));
APP.use(route);
APP.use(Express.json());
APP.use(Express.static(staticFilePath));

// Starting Server
APP.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});
