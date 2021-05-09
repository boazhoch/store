import { IUserUseCase } from "../use-cases/User/UserUseCase";
import {NextFunction, Request, Response} from "express";
import { IBaseRestController } from "./BaseRestController";
import { PresenterFactory } from "../Presenters/types/type";
import { IUser } from "../entity/User/type";
import { catchErrorMethod } from "../interfaces/ErrorHandler/ErrorHandler";
export class UserController implements IBaseRestController {

	constructor(private useCase: IUserUseCase, private presenter: PresenterFactory<IUser>) {
		this.all = this.all.bind(this);
		this.one = this.one.bind(this);
		this.save = this.save.bind(this);
		this.remove = this.remove.bind(this);
	}

	@catchErrorMethod()
	async all(request: Request, response: Response, next: NextFunction) {
		await this.useCase.all(this.presenter(request,response, next));
	}

	@catchErrorMethod()
	async one(request: Request, response: Response, next: NextFunction){
		await this.useCase.one(request.params.id, this.presenter(request,response,next));
	}

	@catchErrorMethod()
	async save(request: Request, response: Response, next: NextFunction){
		try {
			await this.useCase.create(request.body, this.presenter(request,response,next));
		} catch(e) {
			console.error(e);
			next(e);
		}
	}

	@catchErrorMethod()
	async remove(request: Request, response: Response, next: NextFunction){
		await this.useCase.delete(request.body.id, this.presenter(request,response,next));
	}

}