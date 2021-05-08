import { IValiditionUseCase } from "../../services/validation/validation";
import { Repository } from "typeorm";
import { IUser } from "../../entity/User/type";
import User, { UserRoles } from "../../entity/User/User";
import BaseUseCase from "../Base/BaseUseCase";
import { IAuth } from "../Auth/Auth";
import AddressEntity from "../../entity/Address/Address";
import { IPresenter } from "../../Presenters/types/type";


export interface IUserUseCase {
	create(user: IUser, presenter: Pick<IPresenter<IUser>, "one">): Promise<void>
	register(email: string, passowrd: string, presenter: Pick<IPresenter<IUser>, "one">): Promise<void>
	one(email: string, presenter: Pick<IPresenter<IUser>, "one">): Promise<void>
	delete(email: string, presenter: Pick<IPresenter<IUser>, "delete">): Promise<void>
	all(presenter: Pick<IPresenter<IUser>, "all">): Promise<void>;
}

class UserUseCase extends BaseUseCase<IUser> implements IUserUseCase {
	
	constructor(
		validate: IValiditionUseCase,
		private repository: Repository<User>,
		private auth: IAuth) {
		super(validate);
	}

	async create(user: IUser, presenter: IPresenter<IUser>) {
		super.validate(user);
		
		this.isUserExistByEmail(user.eamil);
		
		// Create user entity
		const userEntity = new User();
		const address = new AddressEntity();
		userEntity.address = address;
		userEntity.eamil = user.eamil;
		userEntity.firstName = user.firstName;
		userEntity.lastName = user.lastName;
		userEntity.password = user.password;
		userEntity.isAdmin = user.role === UserRoles.Admin;
		userEntity.role = user.role;

		const hasedPassword = await this.auth.hashPassword(user.password);

		userEntity.password = hasedPassword;

		// Save user
		const savedUser = await this.repository.save(userEntity);
		
		presenter.create(savedUser);
	}

	async one(email: string, presenter: Pick<IPresenter<IUser>, "one">) {
		const user = await this.repository.findOne({where: { email }});
		
		presenter.one(user);
	}

	async register(email: string, unencryptedPassword: string, presenter: Pick<IPresenter<IUser>, "one">) {
		const user = await this.repository.findOne({where: { email }});
		await this.auth.comparePassword(unencryptedPassword, user.password);
		
		presenter.one(user);
	}

	async all(presenter: Pick<IPresenter<IUser>, "all">) {
		const users = await this.repository.find();

		presenter.all(users);
	}

	async delete(userId:string, presenter: Pick<IPresenter<IUser>, "delete">) {
		const userToRemove = await this.repository.findOne(userId);
		await this.repository.remove(userToRemove);

		presenter.delete(userToRemove.id);
	}

	private async isUserExistByEmail(email: string) {
		const user = await this.repository.findOne({where: {email}});
		
		if (user && user.eamil === email) {
			throw new Error("User already exist");
		}
	}
}

export default UserUseCase;