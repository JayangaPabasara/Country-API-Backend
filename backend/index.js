import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";
import userRoute from "./routes/userRoutes.js";
import bodypracer from "body-parser"
import cors from "cors";

dotenv.config();
const app = express();
app.use(bodypracer.json());
app.use(cors());

dbConnection(process.env.MONGO_DB_URI);

app.use("/api/user", userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Server is running on ${port}`);
});