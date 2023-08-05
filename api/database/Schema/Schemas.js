import mongoose from "mongoose";
const doorSchema = new mongoose.Schema({
    name: String,
    color: String,
});

export { doorSchema };
