import { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { IPresenter, PresenterFactory } from "../types/type";
import { IBusiness } from "../../entity/Business/Business";
import Presenter from "..";

class BussinesPresneter<Model extends IBusiness> extends Presenter implements IPresenter<Model> {
	constructor(req: Request, res: Response, next: NextFunction) {
		super(req,res, next);
	}

	public one(model: Model) {
		this.res.status(StatusCodes.OK).json({ data: model });
	}

	public create(model: Model) {
		this.res.status(StatusCodes.CREATED).json({ data: model, ok: true });
	}

	public delete(modelId: string) {
		this.res.status(StatusCodes.OK).json({ data: modelId, ok: true });
	}

	public all(models: Model[]) {
		this.res.status(StatusCodes.OK).json({ data: models, ok: true });
	}
}

export default BussinesPresneter;

export const businessPresenterFactory: PresenterFactory<IBusiness> = (req: Request, res:Response, next: NextFunction) => new BussinesPresneter(req, res, next);