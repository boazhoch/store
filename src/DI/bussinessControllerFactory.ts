import { getRepository } from "typeorm";
import { IValiditionUseCase } from "../services/validation/validation";
import { Business, IBusiness } from "../entity/Business/Business";
import { PresenterFactory } from "../Presenters/types/type";
import presenter, { PresenterTypes } from "../services/factories/presenter/presenter";
import { IUserUseCase } from "../use-cases/User/UserUseCase";
import BusinessUseCase from "../use-cases/Bussiness/Bussines";
import { BusinessController } from "../controller/BussinessController";

const businessControllerFactory = (validate: IValiditionUseCase, userUseCase: IUserUseCase) => {
	const businessUseCase = new BusinessUseCase(validate, getRepository(Business), userUseCase);

	return new BusinessController(businessUseCase, presenter(PresenterTypes.business) as PresenterFactory<IBusiness>);
};

export default businessControllerFactory;