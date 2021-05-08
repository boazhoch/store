import { PresenterFactory } from "./../Presenters/types/type";
import {NextFunction, Request, Response} from "express";
import { IBaseRestController } from "./Controller";
import { IBussinessUseCase } from "../use-cases/Bussiness/Bussines";
import { IBussiness } from "../entity/Business/Business";

export interface IBusinessController extends IBaseRestController {
	getStoreBySlug(request: Request, response: Response, next: NextFunction): Promise<void>
}

export class BusinessController implements IBusinessController {
	constructor(private useCase: IBussinessUseCase, private presenter: PresenterFactory<IBussiness>) {
	}

	async all(request: Request, response: Response, next: NextFunction) {
		this.useCase.all(this.presenter(request,response));
	}

	async one(request: Request, response: Response, next: NextFunction) {
		this.useCase.one(request.body, this.presenter(request,response));
	}

	async save(request: Request, response: Response, next: NextFunction) {
		this.useCase.create(request.body, this.presenter(request,response));
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		this.useCase.delete(request.body.id, this.presenter(request,response));
	}

	async getStoreBySlug(request: Request, response: Response, next: NextFunction) {
		const subDomain = request.subdomains[0];
		this.useCase.getStoreBySlug(subDomain, this.presenter(request,response));
	}

}