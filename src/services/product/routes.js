import { Router } from "express";
import pool from "../../utils/db/connect.js";
import moment from "moment";

const productRouter = Router();

// Create Product
productRouter.post("/", async (req, res, next) => {
    try {
        const productCreateResponse = await pool.query(
            "INSERT INTO product(name,description,brand,image_url,price,category) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
            Object.values(req.body)
        );
        res.status(201).send(productCreateResponse.rows[0]);
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
        if (result.rows[0]) {
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
        const valuesInTheBody = Object.values(req.body);
        const numberOfValues = valuesInTheBody.length;
        const updateStatement = Object.entries(req.body)
            .map(([key, value], i) => `${key}=$${i + 1}`)
            .join(",");
        const query = `UPDATE product SET ${updateStatement} WHERE product_id=$${numberOfValues + 1
            } RETURNING *;`;
        const updateResult = await pool.query(query, [
            ...valuesInTheBody,
            req.params.id,
        ]);
        res.status(201).send(updateResult.rows[0]);
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
        res.status(500).send({ message: error.message })
    }
});
export default productRouter;