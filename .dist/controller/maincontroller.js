"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const joi_1 = __importDefault(require("joi"));
const modelmain_1 = __importDefault(require("../models/modelmain"));
const userData = modelmain_1.default;
// create new users
let newUser = function (req, res) {
    // creating new user
    const user = new userData(req.body);
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        age: joi_1.default.number().required(),
        process: joi_1.default.string().required(),
    });
    const params = schema.validate(req.body, { abortEarly: false });
    if (params.error) {
        res.status(403).send(params.error);
        return;
    }
    // saving user 
    user.save();
    // sending response with status ok
    res.status(200).send(user);
};
//get all user data
let allUser = async (req, res) => {
    //getting all user data
    const users = await userData.find();
    //sending ok response and showed data
    res.status(200).send({ Data: users });
};
//delete user by id
let deleteUser = async (req, res) => {
    try {
        const deleteData = await userData.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(404).send();
        }
        res.send(deleteData);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
// //get by id
let getById = async (req, res) => {
    try {
        const userById = await userData.findById(req.params.id);
        if (!req.params.id) {
            return res.status(404).send();
        }
        res.send(userById);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
// update
let updateById = async (req, res) => {
    try {
        const userById = await userData.findByIdAndUpdate(req.params.id, req.body);
        // if(!req.params.id){
        //     return res.status(404).send();
        // }
        res.send(userById);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
let getByName = async (req, res) => {
    try {
        const userByName = await userData.findOne({ name: req.params.name });
        if (!req.params.name) {
            return res.send();
        }
        res.status(200).send(userByName);
    }
    catch (e) {
        res.status(404).send(e);
    }
};
exports.userController = {
    allUser,
    newUser,
    deleteUser,
    getById,
    updateById,
    getByName
};
