"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const maincontroller_1 = require("../controller/maincontroller");
const express_1 = __importDefault(require("express"));
exports.route = express_1.default.Router();
// //create user
exports.route.post("/user/create", maincontroller_1.userController.newUser);
// //get all data
exports.route.get('/user', maincontroller_1.userController.allUser);
//get by id
exports.route.get("/user/:id", maincontroller_1.userController.getById);
//delete
exports.route.delete('/delete/:id', maincontroller_1.userController.deleteUser);
//update 
exports.route.patch('/user/:id', maincontroller_1.userController.updateById);
// name
exports.route.get('/getUser/:name', maincontroller_1.userController.getByName);
// login
exports.route.post('/login', maincontroller_1.userController.loginUser);
