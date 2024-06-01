"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log({
    apiKey: process.env.MONGO_API_KEY || "",
    dataSource: process.env.MONGO_DATA_SOURCE || "",
});
const mongoDataApi = new _1.MongoDataApi({
    apiKey: process.env.MONGO_API_KEY || "",
    dataSource: process.env.MONGO_DATA_SOURCE || "",
    database: "test",
    collection: "test",
    appId: "data-btuiw",
});
mongoDataApi.find({}).then((data) => {
    console.log(data);
});
// mongoDataApi.insertOne({ name: "test" }).then((data) => {
//   console.log(data);
// });
