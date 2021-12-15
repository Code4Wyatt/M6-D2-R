import { Sequelize } from "sequelize";

const { PGPORT, PGUSER, PGDATABASE, PGPASSWORD,NODE_ENV } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    port: PGPORT,
    host: PGHOST,
    dialect: "postgres",
   ...(NODE_ENV === "production" && {
       dialectOptions: {
           ssl: {
               required: true,
               rejectUnAuthorized: false,
           },
       },
   }),
});

export const connectDB = async() => {
    try {
       await sequelize.authenticate();
       console.log("Database is authenticated");
       await sequelize.sync();
       console.log("DB connection established");
    } catch (error) {
       console.log(error);
    }
};