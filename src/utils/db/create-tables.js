import fs from "fs-extra";
import path from "path";

const readSQLFile = async () => {
    try {
        const filepath = path.join(process.cwd(), './src/utils/db/tables.sql');
        const fileContentAsBuffer = await fs.readFile(filepath);
        const fileContentAsString = fileContentAsBuffer.toString();
        return fileContentAsString;  
    } catch (error) {
        console.log("Cannot read the SQL file due to following error: ", error);
    }
};

(async () => {
    const sqlString = await readSQLFile();
    console.log(sqlString);
})();