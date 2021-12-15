import { Sequelize } from "sequelize";

const { PGDATABASE, PGUSER, PGPASSWORD, PGPORT, PGHOST, NODE_ENV } = process.env;

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
       await sequelize.authenticate({logging: false});
       console.log("Database is authenticated");
       await sequelize.sync();
       console.log("DB connection established");
    } catch (error) {
       console.log("Failed to authenticate", error);
    }
};

export default sequelize;