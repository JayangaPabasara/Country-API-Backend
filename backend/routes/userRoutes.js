import express from "express";
import { addFavorite, getFavorites, removeFavorite, userLogin, userRegister } from "../controllers/userController.js";
import authMiddleWare from "../middleware/authMiddleware.js";

const userRoute = express.Router();

userRoute.post("/register", userRegister);
userRoute.post("/login", userLogin);

//Favorite Endpoints
userRoute.post("/favorite", authMiddleWare, addFavorite);
userRoute.get("/favorites", authMiddleWare, getFavorites);
userRoute.delete("/favorite", authMiddleWare, removeFavorite);

export default userRoute;