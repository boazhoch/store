import passport = require("passport");
import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";

const morgan = require("morgan");
const cors = require("cors");


import {config} from "dotenv";
import connection from "./interfaces/connection/Connection";

config();

connection.create().then(async connection => {
	const {default: routes} = await import("./routes");

	// create express app
	const app = express();
	app.set("subdomain", 1);
	app.use(passport.initialize());
	app.use(cors());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(morgan());

	routes().forEach(router => {
		app.use(router);
	});

	// start express server
	app.listen(process.env.PORT || "3000");

	// // insert new users for test
	// await connection.manager.save(connection.manager.create(User, {
	// 	firstName: "Timber",
	// 	lastName: "Saw",
	// }));
	// await connection.manager.save(connection.manager.create(User, {
	// 	firstName: "Phantom",
	// 	lastName: "Assassin",
	// }));

	console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => {
	console.log(error);
});
