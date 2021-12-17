import express from "express";
import { Product, User, Category } from "../../utils/db/models/index.js";
import { Op } from "sequelize";

const cartRouter = express.Router();

cartRouter.post("/", async (req, res, next) => {
    try {
       console.log(req.body);
       const cart = await Cart.create(req.body);
       res.send(cart);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

cartRouter.get("/", async (req, res, next) => {
    try {
       const cartData = await Cart.findAll();
       res.send(cartData);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

cartRouter.delete("/:id", async (req, res, next) => {
    try {
        const data = await Cart.destroy({
            where: { 
                id: req.params.id,
            },
        });
        res.send({rows: data})
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default cartRouter;