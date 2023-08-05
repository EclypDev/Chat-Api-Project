import mongoose from "mongoose";
import { doorSchema } from "./Schema/Schemas.js";
main()
    .then((res) => console.log("Conecction success!"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017");
}
