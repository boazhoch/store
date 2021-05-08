import { IPresenter } from "./../../Presenters/User/UserPresenter";
import { Repository } from "typeorm";
import { IAuth } from "../../interfaces/Auth/Auth";
import { IValiditionUseCase } from "../../services/validation/validation";
import BaseUseCase from "../Base/BaseUseCase";

interface IAuthUseCase<Model> {
    login(email: string, password: string, presenter: IPresenter<Model>): Promise<void>
}

class AuthUseCase<Model extends {[index:string]: any, password: string}> extends BaseUseCase<Model> implements IAuthUseCase<Model> {
	constructor(
		validate: IValiditionUseCase,
		private repository: Repository<Model>, 
		private auth: IAuth) {
		super(validate);
	}


	public async login(email: string, password: string, presenter: IPresenter<Model>) {
		//Check if username and password are set
		if (!(email && password)) {
			throw new Error("No password or email provided");
		}
	
		let record: Model;
		try {
			record = await this.repository.findOneOrFail({ where: { email } });
		} catch (error) {
			throw new Error("Unauth");
		}
	
		this.auth.comparePassword(password, record.password);

		presenter.one(record);
	} 
    
	public async register(model: Model, presenter: IPresenter<Model>) {
		await super.validate(model);
		
		let record: Model;
		try {
			record = await this.repository.save(model);
		} catch (error) {
			throw new Error("Unauth");
		}

		presenter.one(record);
	}
}

export {IAuth};
export default AuthUseCase;