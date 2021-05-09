import { PresenterFactory } from "./../Presenters/types/type";
import {NextFunction, Request, Response} from "express";
import { IBaseRestController } from "./BaseRestController";
import { IBusiness } from "../entity/Business/Business";
import { IBusinessUseCase } from "../use-cases/Bussiness/Bussines";
import { catchErrorMethod } from "../interfaces/ErrorHandler/ErrorHandler";

export interface IBusinessController extends IBaseRestController {
	getStoreBySlug(request: Request, response: Response, next: NextFunction): Promise<void>
}

export class BusinessController implements IBusinessController {
	constructor(private useCase: IBusinessUseCase, private presenter: PresenterFactory<IBusiness>) {
		this.all = this.all.bind(this);
		this.one = this.one.bind(this);
		this.save = this.save.bind(this);
		this.remove = this.remove.bind(this);
		this.getStoreBySlug = this.getStoreBySlug.bind(this);
	}

	@catchErrorMethod()
	async all(request: Request, response: Response, next: NextFunction) {
		await this.useCase.all(this.presenter(request,response,next));
	}

	@catchErrorMethod()
	async one(request: Request, response: Response, next: NextFunction){
		await this.useCase.one(request.body, this.presenter(request,response,next));
	}

	@catchErrorMethod()
	async save(request: Request, response: Response, next: NextFunction){
		await this.useCase.create(request.body, this.presenter(request,response,next));
	}

	@catchErrorMethod()
	async remove(request: Request, response: Response, next: NextFunction){
		await this.useCase.delete(request.body.id, this.presenter(request,response,next));
	}

	@catchErrorMethod()
	async getStoreBySlug(request: Request, response: Response, next: NextFunction){
		const subDomain = request.subdomains[0];
		await this.useCase.getStoreBySlug(subDomain, this.presenter(request,response,next));
	}

}