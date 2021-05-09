import { IValiditionUseCase } from "../../services/validation/validation";
import { Repository } from "typeorm";
import { IUser } from "../../entity/User/type";
import User, { UserRoles } from "../../entity/User/User";
import BaseUseCase from "../Base/BaseUseCase";
import { IAuth } from "../Auth/Auth";
import AddressEntity from "../../entity/Address/Address";
import { IPresenter } from "../../Presenters/types/type";


export interface IUserUseCase {
	create(user: IUser, presenter: Pick<IPresenter<User>, "one">): Promise<void>
	one(id: string, presenter: Pick<IPresenter<User>, "one">): Promise<void>
	delete(email: string, presenter: Pick<IPresenter<User>, "delete">): Promise<void>
	all(presenter: Pick<IPresenter<User>, "all">): Promise<void>;
}

class UserUseCase extends BaseUseCase<IUser> implements IUserUseCase {
	
	constructor(
		validate: IValiditionUseCase,
		private repository: Repository<User>,
		private auth: IAuth) {
		super(validate);
	}

	async create(user: IUser, presenter: IPresenter<IUser>) {
		const userEntity = new User();
		const address = new AddressEntity();

		const { city, zip, country, state } = user.address;

		address.address = user.address.address;
		address.city = city;
		address.zip = zip;
		address.country = country;
		address.state = state;

		userEntity.address = address;
		userEntity.email = user.email;
		userEntity.firstName = user.firstName;
		userEntity.lastName = user.lastName;
		userEntity.password = user.password;
		userEntity.isAdmin = user.role === UserRoles.Admin;
		userEntity.role = user.role;
		
		userEntity.confirmPassword = user.password;
		userEntity.isMerchant = user.isMerchant;

		await super.validate(userEntity);

		const hasedPassword = await this.auth.hashPassword(user.password);
		userEntity.password = hasedPassword;

		const savedUser = await this.repository.save(userEntity);
		presenter.create(savedUser);
	}

	async one(id: string, presenter: Pick<IPresenter<IUser>, "one">) {
		const user = await this.repository.findOneOrFail(id);
		
		presenter.one(user);
	}

	async all(presenter: Pick<IPresenter<IUser>, "all">) {
		const users = await this.repository.find({ relations: ["business"]});

		presenter.all(users);
	}

	async delete(userId:string, presenter: Pick<IPresenter<IUser>, "delete">) {
		const userToRemove = await this.repository.findOne(userId);
		await this.repository.remove(userToRemove);

		presenter.delete(userToRemove.id);
	}
}

export default UserUseCase;