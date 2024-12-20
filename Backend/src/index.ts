import "dotenv/config";
import express from "express";
import cors from "cors";
import ROUTERS from "./routes/ROUTERS";
import {errorHandler, notFoundHandler} from "./middlewares/errorHandler";
import cookieParser from 'cookie-parser'
import createRouter from "./routes/createRouter";

require("dotenv").config()

const app = express();
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT;

for (let index = 0; index < ROUTERS.length; index++) {
  const router = ROUTERS[index];
  app.use(router.path, createRouter(router.routes));
}

app.use(express.static('public'))

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})