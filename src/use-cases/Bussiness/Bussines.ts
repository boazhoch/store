import { IUserUseCase } from "./../User/UserUseCase";
import { IValiditionUseCase } from "../../services/validation/validation";
import { Repository } from "typeorm";
import BaseUseCase from "../Base/BaseUseCase";
import { Business, IBussiness } from "../../entity/Business/Business";
import { IPresenter } from "../../Presenters/types/type";
import { IUser } from "../../entity/User/type";


export interface IBussinessUseCase {
	create(bussiness: IBussiness, presenter: IPresenter<IBussiness>): Promise<void>
	one(bussinessId: string, presenter: IPresenter<IBussiness>): Promise<void>
	delete(bussinessId: string, presenter: IPresenter<IBussiness>): Promise<void>
	all(presenter: IPresenter<IBussiness>): Promise<void>;
	getStoreBySlug(slug: string, presenter: IPresenter<IBussiness>): Promise<void>
}

class BussinessUseCase extends BaseUseCase<IBussiness> implements IBussinessUseCase {
	
	constructor(
		validate: IValiditionUseCase,
		private repository: Repository<IBussiness>,
		private userUseCase: IUserUseCase
	) {
		super(validate);
	}

	async create(bussiness: IBussiness, presenter: IPresenter<IBussiness>) {
		
		this.userUseCase.one(bussiness.merchant[0].eamil, { 
			one: (user: IUser) => {
				console.log(user);
			}
		});
			
		await super.validate(bussiness);
		
		// Create bussiness entity
		const bussinessEntity = new Business();
		const { desciprtion, title, slug, phone, email, merchant } = bussiness;

		bussinessEntity.desciprtion = desciprtion;
		bussinessEntity.title = title;
		bussinessEntity.slug = slug;
		bussinessEntity.phone = phone;
		bussinessEntity.email = email;
		bussinessEntity.merchant = merchant;

		// Save bussiness
		const savedbussiness = await this.repository.save(bussinessEntity);
		
		presenter.create(savedbussiness);
	}

	async one(bussinessId: string, presenter: IPresenter<IBussiness>) {
		const bussiness = await this.repository.findOne(bussinessId);
		
		presenter.one(bussiness);
	}

	async all(presenter: IPresenter<IBussiness>) {
		const bussinesss = await this.repository.find();

		presenter.all(bussinesss);
	}

	async delete(bussinessId:string, presenter: IPresenter<IBussiness>) {
		const bussinessToRemove = await this.repository.findOne(bussinessId);
		await this.repository.remove(bussinessToRemove);

		presenter.delete(bussinessToRemove.id);
	}

	async getStoreBySlug(slug: string, presenter: IPresenter<IBussiness>) {
		const bussiness = await this.repository.findOneOrFail({ slug });

		presenter.one(bussiness);
	}

	// private async isbussinessExistByEmail(email: string) {
	// 	const bussiness = await this.repository.findOne({where: {email}});
		
	// 	if (bussiness && bussiness.eamil === email) {
	// 		throw new Error("bussiness already exist");
	// 	}
	// }
}

export default BussinessUseCase;