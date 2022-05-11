import App from './src/app';
import dotenv from 'dotenv';
dotenv.config();
let port:any =process.env.PORT|| 5000;
new App(port).listen();
