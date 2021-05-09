import ErrorHandler from "../../interfaces/ErrorHandler/ErrorHandler";
import { IValiditionUseCase, VALIDATION_ERROR } from "../../services/validation/validation";

interface IBaseUseCase<Model extends object> {
    
}

class BaseUseCase<Model extends object> implements IBaseUseCase<Model> {
	constructor(private validation: IValiditionUseCase) {
	}

	protected async validate(model: Model) {
		const errors = await this.validation.validateModel(model);
		const errorMessage = errors.map(error => Object.values(error.constraints)).join(", ");

		if(errors.length) {
			throw new ErrorHandler(VALIDATION_ERROR, `Validation failed, ${errorMessage}`);
		}
	}
}

export default BaseUseCase;