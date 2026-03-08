import express from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/courses.js";
import logger from"./middleware/logger.js";

const app = express();
app.use(express.json());

app.use(logger);
app.use('/', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})