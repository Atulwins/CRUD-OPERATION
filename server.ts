import express from 'express';
import {route} from './router/mainrouter';
import mongoose from 'mongoose';
const connection = mongoose.connect('mongodb://localhost:27017/userData')
const app = express();

app.use(express.json());


app.use(route);



app.listen(5000, function () {
});
