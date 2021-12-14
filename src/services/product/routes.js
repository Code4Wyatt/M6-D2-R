import { Router } from "express";
import pool from "../../utils/db/connect.js";
import moment from "moment";

const productRouter = Router();

productRouter.post("/", async (req, res, next) => {
    try {
        const { name, description, brand, image_url, price, category } = req.body;
        const result = await pool.query(
            "INSERT INTO product (name, description, brand, image_url, price, category) VALUES ('Fender Strat', 'Fender Strat Guitar', 'Fender','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMerS8UVZ-JGbfUjqt8sam85x81Z6WR-s_cA&usqp=CAU', 500, 'Musical') RETURNING *",
        );
        res.status(201).send(result.rows[0]);
    } catch (error) {
        res.status(500).send({ message: error.message });
        console.log(error.message);
    }
}
)

export default productRouter;