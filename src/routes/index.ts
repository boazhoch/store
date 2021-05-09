import routerFactory from "../services/factories/router-factory";
import userRoutes from "./user/user-router";
import { hash, compare } from "bcrypt";
import userControllerFactory from "../DI/userControllerFactory";
import authFactory from "../services/factories/auth-factory";
import { validate } from "class-validator";
import { ValiditionUseCase } from "../services/validation/validation";
import userUseCaseFactory from "../services/factories/user-use-case-factory";
import businessControllerFactory from "../DI/bussinessControllerFactory";
import businessRoutes from "./bussiness/bussiness-router";

const validationUseCase = new ValiditionUseCase(validate);

const user = userControllerFactory(validationUseCase, authFactory(hash,compare));

const controllersByType = {
	user,
	business: businessControllerFactory(validationUseCase, userUseCaseFactory(validationUseCase))
};

export default () => {
	const routers = [userRoutes(controllersByType.user), businessRoutes(controllersByType.business)].map(routerFactory);
	return routers;
};