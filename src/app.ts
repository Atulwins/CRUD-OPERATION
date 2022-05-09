import express, { Application, Router } from "express";
import { json } from "body-parser";
import { connect, ConnectOptions } from "mongoose";
import {route} from "./router/mainrouter";

export default class App {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.connectToMongo();
        this.initializeMiddlewares();
        this.ConnectToRoute();
    }

    private connectToMongo() {
        connect(`mongodb://localhost:27017/CRUD-api`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } as ConnectOptions)
            .then(() => {
                console.log("Connected to MongoDB...");
            })
            .catch((e) => {
                console.error("There was an error connecting to MongoDB:");
                console.error(e);
            });
    }

    private initializeMiddlewares() {
        this.app.use(json());
    }

    private ConnectToRoute(){
        this.app.use(route);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
