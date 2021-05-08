import { Request, Response } from "express";

export default class Presenter {
	constructor(protected req: Request,protected res: Response) {
        
	}
}