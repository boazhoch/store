import passport = require("passport")
import { Route } from "../../services/factories/router-factory";
import { IBaseRestController } from "../../controller/BaseRestController";

const userRoutes = (controller: IBaseRestController): Route[] => [{
	handlerType: "get",
	path: "/users",
	action: controller.all
}, {
	handlerType: "get",
	path: "/users/:id",
	action: controller.one
}, {
	handlerType: "post",
	path: "/users",
	action: controller.save
}, {
	handlerType: "delete",
	path: "/users/:id",
	action: controller.save
}];

export default userRoutes;