import { getRepository } from "typeorm";
import { UserController } from "../controller/UserController";
import UserUseCase from "../use-cases/User/UserUseCase";
import User from "../entity/User/User";

import { IAuth } from "../use-cases/Auth/Auth";
import presenter, { PresenterTypes } from "../services/factories/presenter/presenter";
import { IUser } from "../entity/User/type";
import { PresenterFactory } from "../Presenters/types/type";
import { IValiditionUseCase } from "../services/validation/validation";
import userUseCaseFactory from "../services/factories/user-use-case-factory";

const userControllerFactory = (validate: IValiditionUseCase, auth: IAuth) => {
	return new UserController(userUseCaseFactory(validate, auth), presenter(PresenterTypes.user) as PresenterFactory<IUser>);
};

export default userControllerFactory;