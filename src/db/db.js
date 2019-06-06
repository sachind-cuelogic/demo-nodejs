
import "dotenv/config";
import http from "http";
import app from "../app";
// import logger from "../lib/logger";
import nconf from "nconf";
import path from "path";
import mysql from 'mysql'

const CONFIG_DIR = path.resolve(__dirname, "../config")

nconf.argv()
    .env()
    .file(
        path.join(CONFIG_DIR,
            "config.json"
        )
    );


let connectObject = {
    host: nconf.get("MYSQL_HOST"),
    user: nconf.get("MYSQL_USER"),
    password: nconf.get("MYSQL_PASSWORD"),
    database: nconf.get("MYSQL_DB"),
    port: nconf.get("MYSQL_PORT") || 3306,
    multipleStatements: true,
    timezone: "utc"
};

let mySqlConnection;
mySqlConnection = mysql.createConnection(connectObject);


mySqlConnection.connect((err) => {
    if (err) {
        throw err;
        //  process.exit();
    }
});
console.log("mySqlConnection==>>", mySqlConnection)
export default mySqlConnection;
