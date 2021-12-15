import express from "express";
import cors from "cors";
// import { testDbConnection } from "./utils/db/connect.js";
import { connectDB } from "./utils/db/index.js";
import productRouter from "./services/product/routes.js";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/product", productRouter);

server.listen(process.env.PORT || 5432, () => {
    console.log("Server is running!");
    await connectDB();
})

server.on("error", (error) => console.log("Server is not running due to following error: ", error));