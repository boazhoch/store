import { IValiditionUseCase } from "../../services/validation/validation";

interface IBaseUseCase<Model extends object> {
    
}

class BaseUseCase<Model extends object> implements IBaseUseCase<Model> {
	constructor(private validation: IValiditionUseCase) {
	}

	protected async validate(model: Model) {
		try {
			const errors = await this.validation.validateModel(model);
			if(errors) {
				throw new Error("Errors");
			}
		} catch (e) {
			throw new Error("Error validatiing");
		}
	}
}

export default BaseUseCase;