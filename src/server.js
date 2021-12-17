import express from "express";
import cors from "cors";
// import { testDbConnection } from "./utils/db/connect.js";
import { connectDB } from "./utils/db/index.js";
import productRouter from "./services/product/routes.js";
import reviewRouter from "./services/review/routes.js";
import categoryRouter from "./services/categories/routes.js";
import cartRouter from "./services/cart/routes.js";
import usersRouter from "./services/users/routes.js";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/category", categoryRouter);
server.use("/product", productRouter);
server.use("/review", reviewRouter);
server.use("/user", usersRouter);
server.use("/cart", cartRouter);


server.listen(process.env.PORT || 5432, async () => {
    console.log("Server is running!");
    await connectDB();
})

server.on("error", (error) => console.log("Server is not running due to following error: ", error));