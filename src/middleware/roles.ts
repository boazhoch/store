import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import User, { UserRoles } from "../entity/User/User";

export const checkRole = (roles: UserRoles[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		//Get the user ID from previous midleware
		const id = res.locals.jwtPayload.userId;

		const unauthorizedFail = () => res.status(StatusCodes.UNAUTHORIZED).send();
  
		//Get user role from the database
		const userRepository = getRepository(User);
		let user: User;
		try {
			user = await userRepository.findOneOrFail(id);
		} catch (id) {
			unauthorizedFail();
		}
  
		//Check if array of authorized roles includes the user's role
		if (roles.indexOf(user.role) > -1) next();
		else unauthorizedFail();
	};
};