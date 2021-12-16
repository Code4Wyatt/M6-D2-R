import express from "express";
import { users } from "../../data/users.js";
import { User, Article } from "../../utils/db/models/index.js";
import { Op } from "sequelize";
import { noExtendRight } from "sequelize/dist/lib/operators";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll({ 
            where: {
                ...(req.query.search && {
                    [Op.or]: [
                        {
                            name: { [Op.iLike]: `%${req.query.search}%` },
                        },
                        {
                            email: { [Op.iLike]: `%${req.query.search}%` },
                        },
                        {
                            lastNume: { [Op.iLike]: `%${req.query.search}%` },
                        },
                    ],
                }),
                ...(req.query.age && {
                    age: { [Op.between]: req.query.age.split(","),
                },
                }),
            },
            include: [
                { model: Review attributes: { exclude: ["realTimeValue"] } },
            ],
            limit: req.query.limit,
            offset: parseInt(req.query.limit * req.query.page),
        });

        res.send(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

usersRouter.post("/", async (req, res, next) => {
    try {
        console.log(req.body);
        const data = await User.create(req.body);
        res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

usersRouter.post("/bulk", async (req, res, next) => {
    try {
        const data = await User.bulkCreate(users);
        res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

usersRouter.get("/:id", async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if(user) {
            res.send(user);
        } else { 
            res.status(404).send("Not found");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});