import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../interfaces/ErrorHandler/ErrorHandler";

export interface IBasePrenseter {
	error(statusCode: StatusCodes, message?: string): void
	alreadyExistError(): void
}

export default class Presenter implements IBasePrenseter {
	constructor(protected req: Request,protected res: Response, protected next: NextFunction) {
        
	}

	error(statusCode: StatusCodes, message?: string) {
		this.next(new ErrorHandler(statusCode, message));
	}

	alreadyExistError() {
		this.error(422, "Entity already exist");
	}
}