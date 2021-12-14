import express from "express";
import cors from "cors";
import { testDbConnection } from "./utils/db/connect.js";
import productRouter from "./services/product/routes.js";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/product", productRouter);

server.listen(process.env.PORT || 5001, () => {
    console.log("Server is running!");
    testDbConnection();
})

server.on("error", (error) => console.log("Server is not running due to following error: ", error));