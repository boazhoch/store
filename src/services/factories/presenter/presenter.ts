import { NextFunction, Request, Response } from "express";
import BussinesPresneter from "../../../Presenters/Bussiness/BussinessPresenter";
import UserPresneter from "../../../Presenters/User/UserPresenter";

export enum PresenterTypes {
	business = "business",
	user = "user"
}

const presentersMap = {
	[PresenterTypes.business]: BussinesPresneter,
	[PresenterTypes.user]: UserPresneter
};

export default (type: PresenterTypes) => (req: Request, res:Response, next: NextFunction) => {
	return new presentersMap[type](req, res, next);
};