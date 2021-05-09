import { IBasePrenseter } from "./../index";
import { NextFunction, Request, Response } from "express";

export type PresenterFactory<Model> = (req: Request, res:Response, next: NextFunction) => IPresenter<Model>

export interface IPresenter<Model> extends IBasePrenseter {
    one: (model: Model) => void;
	delete: (modelId: string) => void;
	create: (model: Model) => void;
	all: (models: Model[]) => void;
}