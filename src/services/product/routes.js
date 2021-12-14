import { Router } from "express";
import pool from "../../utils/db/connect.js";
import moment from "moment";

const productRouter = Router();

// Create Product
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

//Get All Products
productRouter.get("/", async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM product;");
        res.send(result.rows);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

//Get Specific Product
productRouter.get("/:id", async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM product WHERE product_id = $1", 
        [req.params.id]
        );
        if(result.rows[0]) {
            res.send(result.rows[0]);
        } else {
            res.status(404).send(`Product with id ${req.params.id} not found.`);
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

//Edit Product
productRouter.put("/:id", async (req, res, next) => {
    try {
        const updateStatement = Object.entries(req.body).map(([key, value]) => `${key} = '${value}'`).join(", ");
        const updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");
        const query = `UPDATE product SET ${updateStatement}, updatedAt = ${updatedAt} WHERE product_id = ${req.params.id} RETURNING *;`;
        const result = await pool.query(query);
        res.send(result.rows[0]);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

//Delete Product
productRouter.delete("/:id", async (req, res, next) => {
    try {
        const query = `DELETE FROM product WHERE product_id = ${req.params.id};`;
        await pool.query(query);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

export default productRouter;