import { ValidatorOptions, ValidationError } from "class-validator";

type ValidateFn = (object: object, validatorOptions?: ValidatorOptions) => Promise<ValidationError[]>

export interface IValiditionUseCase {
    validateModel<GenericModel extends object>(model: GenericModel): Promise<ValidationError[]>
}

export class ValiditionUseCase implements IValiditionUseCase {
	constructor(private validate: ValidateFn) {
	}

	validateModel<GenericModel extends object>(model: GenericModel) {
		return this.validate(model);
	}
}