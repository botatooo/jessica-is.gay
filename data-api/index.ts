import Fastify from "fastify";
import database from "./utils/database";
import dotenv from "dotenv";
import cors from "@fastify/cors";
dotenv.config({path: "../.env"});

const server = Fastify({logger: true});
const origin = process.env.SPACE === 'dev' ? true : ["https://jessica-is.gay"];
// Register route files
server.register(cors, {
    origin: origin,
    allowedHeaders: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
})
server.register(require("./routes/blogs"));

// Listening on port 8081, callback starts database connection
server.listen({port: 80, host: "0.0.0.0"}, async () => {
    await database.start({
        mongoURL: String(process.env.MONGO),
        redisURL: String(process.env.REDIS),
    });
    console.log("API is online! " + new Date(Date.now()));
});