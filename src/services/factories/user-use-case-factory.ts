import { getRepository } from "typeorm";
import User from "../../entity/User/User";
import { IAuth } from "../../interfaces/Auth/Auth";
import UserUseCase from "../../use-cases/User/UserUseCase";
import { IValiditionUseCase } from "../validation/validation";
import authFactory from "./auth-factory";

export default (validate: IValiditionUseCase, auth: IAuth = authFactory()) => {
	return new UserUseCase(validate, getRepository(User), auth);
};