import { Response, ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

interface IErrorHandler {
    statusCode: StatusCodes;
    message: string;
}

class ErrorHandler extends Error  {
	constructor(public statusCode: StatusCodes, public message: string) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}

const handleError = (err: IErrorHandler, res: Response) => {
	const { statusCode = 500, message } = err;
	res.status(statusCode).json({
		status: "error",
		statusCode,
		message
	});
};

function catchErrorMethod() {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalFn = descriptor.value;

		descriptor.value = async function(...args: any[]) {
			const nextHandler = args[args.length -1];
			try {
				await originalFn.apply(this, args);
			} catch(e) {
				nextHandler(e);
			}
		};

		return descriptor;
	};
}

export { handleError, catchErrorMethod, IErrorHandler};
export default ErrorHandler;