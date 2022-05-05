"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainrouter_1 = require("./router/mainrouter");
const mongoose_1 = __importDefault(require("mongoose"));
const connection = mongoose_1.default.connect('mongodb://localhost:27017/userData');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(mainrouter_1.route);
app.listen(5000, function () {
});
