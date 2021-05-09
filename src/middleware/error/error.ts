import { StatusCodes } from "http-status-codes";
import { NextFunction, Response } from "express";
import { Request } from "express";
import { handleError, IErrorHandler } from "../../interfaces/ErrorHandler/ErrorHandler";
import { VALIDATION_ERROR } from "../../services/validation/validation";

const sqliteErrorMapper = {
	[VALIDATION_ERROR]: {
		StatusCodes:StatusCodes.UNPROCESSABLE_ENTITY
	},
	19: {
		statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
		message: "Entity already exist"
	}
};

interface IError extends IErrorHandler {
	errno?: number;
}

export default (err: IError, req: Request, res: Response, next: NextFunction) => {
	const { errno } = err;

	if (errno || err.statusCode === VALIDATION_ERROR) {
		return handleError({ message: err.message, ...sqliteErrorMapper[errno] },res);
	}

	handleError(err, res);
};