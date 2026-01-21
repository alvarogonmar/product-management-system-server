import express from "express"
import colors from "colors";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Test DB connection
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.magenta('Database connected successfully.'));
    } catch (error) {
        console.log(colors.red.bold('Unable to connect to the database:'));
    }
}

connectDB()

// Initialize Express server
const server = express();

// Read data from body
server.use(express.json());

server.use('/api/productos', router);

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


export default server;