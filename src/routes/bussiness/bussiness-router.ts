import passport = require("passport");
import { IBusinessController } from "../../controller/BussinessController";
import { Route } from "../../services/factories/router-factory";

const businessRoutes = (controller: IBusinessController): Route[] => [{
	handlerType: "get",
	path: "/business",
	action: controller.all,
}, {
	handlerType: "get",
	path: "/business/:id",
	action: controller.one
}, {
	handlerType: "post",
	path: "/business",
	action: controller.save,
	preMiddlewares: passport.authenticate("jwt", { session: false }),
}, {
	handlerType: "delete",
	path: "/business/:id",
	action: controller.remove,
	preMiddlewares: passport.authenticate("jwt", { session: false }),
}, {
	handlerType: "get",
	path: "/",
	preMiddlewares: passport.authenticate("jwt", { session: false }),
	action: controller.getStoreBySlug,
}];

export default businessRoutes;