import { getRepository } from "typeorm";

import { IValiditionUseCase } from "../services/validation/validation";
import BussinessUseCase from "../use-cases/Bussiness/Bussines";
import { Business, IBussiness } from "../entity/Business/Business";
import { BusinessController } from "../controller/BussinessController";
import { PresenterFactory } from "../Presenters/types/type";
import presenter, { PresenterTypes } from "../services/factories/presenter/presenter";
import { IUserUseCase } from "../use-cases/User/UserUseCase";

const bussinessControllerFactory = (validate: IValiditionUseCase, userUseCase: IUserUseCase) => {
	const bussinessUseCase = new BussinessUseCase(validate, getRepository(Business), userUseCase);

	return new BusinessController(bussinessUseCase, presenter(PresenterTypes.bussiness) as PresenterFactory<IBussiness>);
};

export default bussinessControllerFactory;