import { Request, Response } from "express";
import BussinesPresneter from "../../../Presenters/Bussiness/BussinessPresenter";
import UserPresneter from "../../../Presenters/User/UserPresenter";

export enum PresenterTypes {
	bussiness = "bussiness",
	user = "user"
}

const presentersMap = {
	[PresenterTypes.bussiness]: BussinesPresneter,
	[PresenterTypes.user]: UserPresneter
};

export default (type: PresenterTypes) => (req: Request, res:Response) => {
	return new presentersMap[type](req, res);
};