import passport = require("passport")
import { Route } from "../../services/factories/router-factory";
import { IBaseRestController } from "../../controller/Controller";

const userRoutes = (controller: IBaseRestController): Route<IBaseRestController>[] => [{
	handlerType: "get",
	path: "/users",
	controller: controller,
	action: "all"
}, {
	handlerType: "get",
	path: "/users/:id",
	preMiddlewares: passport.authenticate("jwt", {session: false}),
	controller: controller,
	action: "one"
}, {
	handlerType: "post",
	path: "/users",
	controller: controller,
	action: "save"
}, {
	handlerType: "delete",
	path: "/users/:id",
	controller: controller,
	action: "remove"
}];

export default userRoutes;