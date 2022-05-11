import joi from 'joi';
import { Request, Response } from 'express';
import userModel from '../models/modelmain';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import STATUS_CODES from '../utils/statuscode';
import sendReponse from '../utils/response';
const userData = userModel;




// create new users

let newUser = async function (req: Request, res: Response) {
    // creating new user
    // cons 
    const schema = joi.object({
        name: joi.string().required(),
        age: joi.number().required(),
        process: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required()

    })
    const params = schema.validate(req.body, { abortEarly: false });
    if (params.error) {
        res.status(403).send(params.error)
        return
    }
    let userInput = req.body;
    userInput.password = await bcrypt.hash(userInput.password, 10);
    const user = new userData({
        name: userInput.name,
        age: userInput.age,
        process: userInput.process,
        email: userInput.email,
        password: userInput.password
    })
    // saving user 
    user.save()
    // sending response with status ok
    res.status(200).send(user)
}

//get all user data

let allUser = async (req: Request, res: Response) => {
    //getting all user data
    const users = await userData.find()
    //sending ok response and showed data
    res.status(200).send({ Data: users });
}

//delete user by id
let deleteUser = async (req: Request, res: Response) => {
    try {

        const deleteData = await userData.findByIdAndDelete(req.params.id)
        if (!req.params.id) {
            return res.status(404).send();

        }
        res.send(deleteData);
    } catch (error) {
        res.status(500).send(error)
    }
}

// //get by id
let getById = async (req: Request, res: Response) => {
    try {
        const userById = await userData.findById(req.params.id)
        if (!req.params.id) {
            return res.status(404).send();
        }
        res.send(userById);
    } catch (error) {
        res.status(500).send(error)
    }

}
// update
let updateById = async (req: Request, res: Response) => {
    try {
        const userById = await userData.findByIdAndUpdate(req.params.id, req.body)
        // if(!req.params.id){
        //     return res.status(404).send();
        // }
        res.send(userById);
    } catch (error) {
        res.status(500).send(error)
    }

}
let getByName = async (req: Request, res: Response) => {
    try {
        const userByName = await userData.findOne({ name: req.params.name })
        if (userByName === null) {
            return sendReponse(res, { message: "invalid credential" }, STATUS_CODES.not_found)
            // res.status(200).send(userByName)
        }
        else {
            return sendReponse(res, { message: "valid credential" }, STATUS_CODES.ok)

        }

    }
    catch (e) {
        // res.status(404).send(e)
        return sendReponse(res, { message: "invalid credential" }, STATUS_CODES.not_found)

    }
}

let loginUser = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userlogin: any = await userData.findOne({ email: email })
        // res.send(userlogin)
        const checkPass = await bcrypt.compare(password, userlogin.password)
        if (checkPass === true) {

            const createToken = jwt.sign({_id:"any"},"qwertyuiopasdfghjklzxcvbnmqwerty")
            // const createToken = jwt.sign(user,)
            // res.json({ createToken: createToken })

            // res.status(201).send({msg:"login sucessfull"});
            return sendReponse(res, { message: "Login Sucessful", token: createToken }, STATUS_CODES.ok)
            // console.log(res.status(201).send(userlogin))

        }
        else {
            return sendReponse(res, { message: "invalid credential" }, STATUS_CODES.not_found)
            // res.send({msg:"password is incorrect"})
        }
    } catch (error) {
        return sendReponse(res, { message: "invalid credential" }, STATUS_CODES.not_found)

        // res.status(400).send(error)
    }
}






export const userController = {
    allUser,
    newUser,
    deleteUser,
    getById,
    updateById,
    getByName,
    loginUser,

}

function _id(_id: any): any {
    throw new Error('Function not implemented.');
}

function jsonwebtoken(arg0: { id: any; }, jsonwebtoken: any) {
    throw new Error('Function not implemented.');
}

function id(id: any): never {
    throw new Error('Function not implemented.');
}

function user(user: any, ACCESS_TOKEN_SECRET: string | undefined) {
    throw new Error('Function not implemented.');
}

