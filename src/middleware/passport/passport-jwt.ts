import passport = require("passport")
import { getRepository } from "typeorm";
import * as passportJwt from "passport-jwt";
import User from "../../entity/User/User";

export default () => {
	const jwtOptions = {
		jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.TOKEN_SECRET,
	};
	
	const strategy = new passportJwt.Strategy(jwtOptions, function(jwt_payload, next) {
		console.log("payload received", jwt_payload);
		
		const repo = getRepository(User);
		const user = repo.findOneOrFail(jwt_payload.id);
		if (user) {
			next(null, user);
		} else {
			next(null, false);
		}
	});
	
	passport.use(strategy);
};