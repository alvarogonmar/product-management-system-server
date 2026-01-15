import express from "express"
import colors from "colors";
import router from "./router";
import db from "./config/db";

// Test DB connection
async function connectDB() {
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

server.get('/api', (req, res) => {
    res.json({msg: "From API"});
});

export default server;