import mongoose from "mongoose";

function dbConnection(dbURI){

    mongoose.connect(dbURI);

    const connetion = mongoose.connection;

    connetion.once("open", () => {
        console.log("DB Connection Successfully.")
    });
}

export default dbConnection;