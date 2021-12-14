import fs from "fs-extra";
import path from "path";
import pool from "./connect.js";

console.log(process.env);

const createTables = async () => {
    try {
        const filePath = path.join(process.cwd(), './src/utils/db/tables.sql');
        const fileContentAsBuffer = await fs.readFile(filePath);
        const fileContentAsString = fileContentAsBuffer.toString();
        console.log(fileContentAsString);
        return fileContentAsString;  
        
    } catch (error) {
        console.log("Cannot read the SQL file due to following error: ", error);
    }
};

(async () => {
    await createTables();
    
})();