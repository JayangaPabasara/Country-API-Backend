import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function userRegister(req, res) {

    const data = req.body;

    try{

        const user = await User.findOne({
            userName: data.userName
        });

        if(user){
            return res.status(400).json({
                message: "You entered user name is already exist, use another username."
            });
        }

        const newUser = new User({
            name: data.name,
            userName: data.userName
        });

        await newUser.save();

        res.status(201).json({
            message: "Registration Successfull."
        });

    }catch(error){
        res.status(500).json({
            message: "Registration Failed, Internal Server Error."
        });
        console.log(error);
    }
    
}

export async function userLogin(req, res){

    const data = req.body;

    try{

        const user = await User.findOne({
            userName: data.userName
        });

        if(!user){
            return res.status(404).json({
                message: "User Not Found."
            });
        }

        const token = jwt.sign({
            name: user.name,
            userName: user.userName
        }, process.env.SECRET_KEY);

        res.status(200).json({
            message: "Login successfull.",
            token: token,
            name: user.name
        });

    }catch(error){
        res.status(500).json({
            message: "Login Failed, Internal Server Error."
        })
    }
}

//Add a country to user's favaorites.
export async function addFavorite(req, res) {
    const { countryCode } = req.body;
  
    try {
      const user = await User.findOne({ userName: req.user.userName });
      if (!user.favorites.includes(countryCode)) {
        user.favorites.push(countryCode);
        await user.save();
      }
      res.status(200).json({ message: "Country added to favorites." });
    } catch (err) {
      res.status(500).json({ message: "Failed to add favorite." });
    }
  }
  
  // Get all favorite countries
  export async function getFavorites(req, res) {
    try {
      const user = await User.findOne({ userName: req.user.userName });
      res.status(200).json({ favorites: user.favorites });
    } catch (err) {
      res.status(500).json({ message: "Failed to retrieve favorites." });
    }
  }
  
  // Remove a country from favorites
  export async function removeFavorite(req, res) {
    const { countryCode } = req.body;
  
    try {
      const user = await User.findOne({ userName: req.user.userName });
      user.favorites = user.favorites.filter(code => code !== countryCode);
      await user.save();
      res.status(200).json({ message: "Country removed from favorites." });
    } catch (err) {
      res.status(500).json({ message: "Failed to remove favorite." });
    }
  }