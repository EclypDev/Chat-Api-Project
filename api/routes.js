import { Router } from "express";
import Path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);
const route = Router();

//paths
const pathWeb = Path.join(__dirname, "../web");
const indexFilePath = Path.join(pathWeb, "index.html");

//routes
route.get("/", (req, res) => {
    res.sendFile(indexFilePath);
});

//exports
export default route;
