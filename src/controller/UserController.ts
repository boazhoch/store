import { IUserUseCase } from "../use-cases/User/UserUseCase";
import {NextFunction, Request, Response} from "express";
import { IBaseRestController } from "./Controller";
import { PresenterFactory } from "../Presenters/types/type";
import { IUser } from "../entity/User/type";


export class UserController implements IBaseRestController {
	constructor(private useCase: IUserUseCase, private presenter: PresenterFactory<IUser>) {
	}

	async all(request: Request, response: Response, next: NextFunction) {
		this.useCase.all(this.presenter(request,response));
	}

	async one(request: Request, response: Response, next: NextFunction) {
		this.useCase.one(request.body.userId, this.presenter(request,response));
	}

	async save(request: Request, response: Response, next: NextFunction) {
		this.useCase.create(request.body, this.presenter(request,response));
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		this.useCase.delete(request.body.id, this.presenter(request,response));
	}

}