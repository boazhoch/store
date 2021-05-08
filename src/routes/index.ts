import routerFactory from "../services/factories/router-factory";
import userRoutes from "./user/user-router";
import bussinessRoutes from "./bussiness/bussiness-router";
import { hash, compare } from "bcrypt";
import userControllerFactory from "../DI/userControllerFactory";
import authFactory from "../services/factories/auth-factory";
import bussinessControllerFactory from "../DI/bussinessControllerFactory";
import { validate } from "class-validator";
import { ValiditionUseCase } from "../services/validation/validation";
import userUseCaseFactory from "../services/factories/user-use-case-factory";

const validationUseCase = new ValiditionUseCase(validate);

const user = userControllerFactory(validationUseCase, authFactory(hash,compare));

const controllersByType = {
	user,
	bussiness: bussinessControllerFactory(validationUseCase, userUseCaseFactory(validationUseCase))
};

export default () => {
	const routers = [userRoutes(controllersByType.user), bussinessRoutes(controllersByType.bussiness)].map(routerFactory);
	return routers;
};