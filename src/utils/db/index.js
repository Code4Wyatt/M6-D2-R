import { Sequelize } from "sequelize";

const { PGPORT, PGUSER, PGDATABASE, PGPASSWORD } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    port: PGPORT,
    host: PGHOST,
    dialect: "postgres",
});

const connectDB = async() => {
    try {
       await sequelize.authenticate();
       console.log("Database is authenticated");
    } catch (error) {
       console.log(error);
    }
}