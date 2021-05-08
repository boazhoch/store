import { Request, Response } from "express";

export type PresenterFactory<Model> = (req: Request, res:Response) => IPresenter<Model>

export interface IPresenter<Model> {
    one: (model: Model) => void;
	delete: (modelId: string) => void;
	create: (model: Model) => void;
	all: (models: Model[]) => void;
}