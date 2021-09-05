import { envVariables, dbConnection } from "./configs";

import express from "express";
const morgan = require("morgan");
import path from "path";
import http from "http";
import io from "socket.io";

import { userRouter } from "./routers"

const { PORT, MONGO_URL } = envVariables;

const app = express();
const server = http.createServer(app);
io = io(server);

dbConnection(MONGO_URL);

app.use(morgan("combined"));
app.use(express.static('./src/public'));
app.use('/script', express.static("./node_modules/web3.js-browser/build/"))

app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	}),
);

// config template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

// home route
app.get("/", (req, res) => {
	res.render('home/index.ejs', { message: "" });
});

app.use("/users", userRouter);

// start server
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});