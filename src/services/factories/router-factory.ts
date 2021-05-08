import { IRouter, Router,  NextFunction, Request, Response,  } from "express";
import { IBaseRestController } from "../../controller/Controller";

type Routes<Controller extends IBaseRestController> = Route<Controller>[];

type Middleware = (req: Request, res: Response, next: NextFunction) => void

export type Route<Controller extends IBaseRestController> = {
    path: string, 
    handlerType: HandlerType
    controller: Controller,
	action: keyof Controller,
	preMiddlewares?: Middleware[]
	postMiddlewares?: Middleware[]
}

type HandlerType = keyof Pick<IRouter, "all" | "get" | "post" |"delete"|"patch">;

const routerFactory = <Controller extends IBaseRestController = IBaseRestController>(routes: Routes<Controller>) => {
	const router = Router();

	for (const routeKey in routes) {
		const route = routes[routeKey];
		const { path, handlerType, controller, action, preMiddlewares = [], postMiddlewares = [] } = route;

		//@ts-ignore
		router[handlerType](path, preMiddlewares, controller[action], postMiddlewares);
	}

	return router;
};

export default routerFactory;