import express from "express";
import mongoose from "mongoose";
import "./database/database.js";
import { doorSchema } from "./database/Schema/Schemas.js";

const APP = express();

//config
const PORT = process.env.PORT || 3000;

//middlewares

APP.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});
