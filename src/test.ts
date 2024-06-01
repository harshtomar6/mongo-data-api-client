import { MongoDataApi } from "./";
import dotEnv from "dotenv";
dotEnv.config();

console.log({
  apiKey: process.env.MONGO_API_KEY || "",
  dataSource: process.env.MONGO_DATA_SOURCE || "",
});

const mongoDataApi = new MongoDataApi({
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
