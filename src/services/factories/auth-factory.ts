import { compare, hash } from "bcrypt";
import Auth, { IAuth } from "../../interfaces/Auth/Auth";

let authService: IAuth;

const authFactory = (hashPass = hash,comparePass = compare) => {
	if (authService) {
		return authService;
	}
	authService = new Auth(hashPass, comparePass);
	return authService;
};

export default authFactory;