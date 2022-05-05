import {userController} from '../controller/maincontroller';
import express  from 'express';
export const route = express.Router();


// //create user
route.post("/user/create", userController.newUser);

// //get all data
route.get('/user', userController.allUser);

//get by id
route.get("/user/:id",userController.getById)


//delete
route.delete('/delete/:id',userController.deleteUser);
//update 
route.patch('/user/:id',userController.updateById);
// name
route.get('/getUser/:name',userController.getByName);