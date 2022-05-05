import joi, { object } from 'joi';
import {  Request, Response } from 'express';
import userModel from '../models/modelmain';
const userData = userModel;

// create new users

let newUser = function (req:Request, res:Response) {
    // creating new user
    const user = new userData(req.body);
    const schema = joi.object({
        name:joi.string().required(),
        age:joi.number().required(),
        process:joi.string().required(),
    })
    const params =schema.validate(req.body,{ abortEarly : false});
if (params.error){
    res.status(403).send(params.error)
    return
}

    // saving user 
    user.save()
    // sending response with status ok
    res.status(200).send(user)
}

//get all user data

let allUser = async (req:Request, res:Response) => {
    //getting all user data
    const users = await userData.find()
    //sending ok response and showed data
    res.status(200).send({ Data: users });
}

//delete user by id
let deleteUser = async(req:Request, res:Response) =>{
    try {
 
        const deleteData = await userData.findByIdAndDelete(req.params.id) 
        if(!req.params.id){
            return res.status(404).send();

        }
        res.send(deleteData);
    } catch (error) {
        res.status(500).send(error)
    }
}

// //get by id
let getById= async (req:Request, res:Response)=>{
    try{
    const userById= await userData.findById(req.params.id)
        if(!req.params.id){
            return res.status(404).send();
        }
        res.send(userById);
} catch(error){
    res.status(500).send(error)
}
    
}
    // update
    let updateById= async (req:Request, res:Response)=>{
        try{
        const userById= await userData.findByIdAndUpdate(req.params.id,req.body)
            // if(!req.params.id){
            //     return res.status(404).send();
            // }
            res.send(userById);
    } catch(error){
        res.status(500).send(error)
    }
        
    }
    let getByName= async (req:Request, res:Response)=>{
        try{
            const userByName =await userData.findOne({name:req.params.name})
            if(!req.params.name){
                return res.send()
            }
            res.status(200).send(userByName)
            }
            catch(e){
                res.status(404).send(e);
            }
        }
     

export const userController = {
    allUser, 
    newUser,
    deleteUser,
    getById,
    updateById,
    getByName
}