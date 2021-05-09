import { IRouter, Router,  NextFunction, Request, Response,  } from "express";

type Routes = Route[];

type Middleware = (req: Request, res: Response, next: NextFunction) => void

export type Route = {
    path: string, 
    handlerType: HandlerType
	action: Handler,
	preMiddlewares?: Middleware[]
	postMiddlewares?: Middleware[]
}

type HandlerType = keyof Pick<IRouter, "all" | "get" | "post" |"delete"|"patch">;

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void>

export function wrapMiddlewareWithError(handler: Handler) {
	return async function(req: Request, res: Response, next: NextFunction) {
		try {
			await handler(req, res, next);
		} catch (e) {
			next(e);
		}
	};
}

const routerFactory = (routes: Routes) => {
	const router = Router();

	for (const routeKey in routes) {
		const route = routes[routeKey];
		const { path, handlerType,  action, preMiddlewares = [], postMiddlewares = [] } = route;

		router[handlerType](path, preMiddlewares, wrapMiddlewareWithError(action), postMiddlewares);
	}

	return router;
};

export default routerFactory;