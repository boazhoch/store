import passport = require("passport")
import { getRepository } from "typeorm";
import {ExtractJwt, Strategy} from "passport-jwt";
import User from "../../entity/User/User";


const jwtOptions = {
	jwtFromRequest :ExtractJwt.fromAuthHeader(),
	secretOrKey : process.env.TOKEN_SECRET,
};

const strategy = new Strategy(jwtOptions, function(jwt_payload, next) {
	console.log("payload received", jwt_payload);
	// usually this would be a database call:
	const repo = getRepository(User);
	const user = repo.findOneOrFail(jwt_payload.id);
	if (user) {
		next(null, user);
	} else {
		next(null, false);
	}
});

passport.use(strategy);