import { NextFunction, Request, Response, } from "express";
import jwt from "jsonwebtoken";
import sendReponse from "../utils/response";
import STATUS_CODES from "../utils/statuscode";
// import multer from 'multer'

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenString:any = req.headers.authorization
        console.log(tokenString)
        let token = tokenString.replace('Bearer ', "")
        let secretkey:any = process.env.SECRET_KEY
        const verifyUser: any = jwt.verify(token, secretkey)
        console.log(verifyUser)
        if (verifyUser) {
            // req.userId =verifyUser._id
            return sendReponse(res, { message: "user authorized", verifyUser }, STATUS_CODES.ok)

        }
        else {
            return sendReponse(res, { message: "user inauthorized" }, STATUS_CODES.un_authorized)
        }
        next();
    }
    catch (e) {
        return sendReponse(res, { message: "user unauthorized" }, STATUS_CODES.un_authorized)
    }


}

export default auth;