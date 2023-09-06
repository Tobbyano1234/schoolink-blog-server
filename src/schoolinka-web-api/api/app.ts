import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import routes from "./routes";
import { error } from "../config/errors";


function createServer() {
    const app = express();


    app
        .use(helmet({ dnsPrefetchControl: false, frameguard: false, ieNoOpen: false }))
        .use(cors({ credentials: true, origin: true }))
        .use(cookieParser())
        .use(logger("tiny"))
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use("/api/v1", routes)
        .use(error.converter)
        .use(error.notFound)
        .use(error.handler)

    return app;
}

export default createServer;


