import {envVariables, dbConnection} from "./configs";

import express from "express";
const morgan = require("morgan");

const {PORT, MONGO_URL} = envVariables;

const app = express();

dbConnection(MONGO_URL);

app.use(morgan("combined"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})