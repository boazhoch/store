import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { IPresenter, PresenterFactory } from "../types/type";
import { IBussiness } from "../../entity/Business/Business";
import Presenter from "..";

class BussinesPresneter<Model extends IBussiness> extends Presenter implements IPresenter<Model> {
	constructor(req: Request, res: Response) {
		super(req,res);
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

export const bussinessPresenterFactory: PresenterFactory<IBussiness> = (req: Request, res:Response) => new BussinesPresneter(req,res);