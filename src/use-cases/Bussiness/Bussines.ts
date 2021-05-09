import { IUserUseCase } from "./../User/UserUseCase";
import { IValiditionUseCase } from "../../services/validation/validation";
import { Repository } from "typeorm";
import BaseUseCase from "../Base/BaseUseCase";
import { Business, IBusiness } from "../../entity/Business/Business";
import { IPresenter } from "../../Presenters/types/type";
import { IUser } from "../../entity/User/type";


export interface IBusinessUseCase {
	create(business: IBusiness, presenter: IPresenter<IBusiness>): Promise<void>
	one(businessId: string, presenter: IPresenter<IBusiness>): Promise<void>
	delete(businessId: string, presenter: IPresenter<IBusiness>): Promise<void>
	all(presenter: IPresenter<IBusiness>): Promise<void>;
	getStoreBySlug(slug: string, presenter: IPresenter<IBusiness>): Promise<void>
}

class BusinessUseCase extends BaseUseCase<IBusiness> implements IBusinessUseCase {
	
	constructor(
		validate: IValiditionUseCase,
		private repository: Repository<IBusiness>,
		private userUseCase: IUserUseCase
	) {
		super(validate);
	}

	async create(business: IBusiness, presenter: IPresenter<IBusiness>) {
		
		const businessEntity = new Business();
		const { desciprtion, title, slug, phone, email, merchant } = business;
		
		await this.userUseCase.one(merchant[0].id, { 
			one: (user) => {
				businessEntity.merchant = [user];
			}
		});

		businessEntity.desciprtion = desciprtion;
		businessEntity.title = title;
		businessEntity.slug = slug;
		businessEntity.phone = phone;
		businessEntity.email = email;

		await super.validate(business);

		const savedbusiness = await this.repository.save(businessEntity);
		presenter.create(savedbusiness);

		// try {
			
		// } catch(e) {
		// 	presenter.alreadyExistError();
		// }
	
	}

	async one(businessId: string, presenter: IPresenter<IBusiness>) {
		const business = await this.repository.findOne(businessId, { relations: ["merchant"] });
		
		presenter.one(business);
	}

	async all(presenter: IPresenter<IBusiness>) {
		const businesss = await this.repository.find({ relations: ["merchant"] });

		presenter.all(businesss);
	}

	async delete(businessId:string, presenter: IPresenter<IBusiness>) {
		const businessToRemove = await this.repository.findOneOrFail(businessId, { relations: ["merchant"] });

		await this.repository.remove(businessToRemove);

		presenter.delete(businessToRemove.id);
	}

	async getStoreBySlug(slug: string, presenter: IPresenter<IBusiness>) {
		const business = await this.repository.findOneOrFail({ slug }, { relations: ["merchant"] });

		presenter.one(business);
	}
}

export default BusinessUseCase;