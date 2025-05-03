import jwt from "jsonwebtoken";

function authMiddleWare(req, res, next){

    let token = req.header("Authorization");

    if(!token){
        return res.status(400).json({
            message: "Please Log in and try again."
        });
    }

    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.SECRET_KEY, (error, decode) =>{
        if(!error){
            req.user = decode;
            next();
        }else{
            console.log(error);
        }
    });
}

export default authMiddleWare;