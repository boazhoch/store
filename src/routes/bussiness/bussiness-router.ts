import { IBusinessController } from "../../controller/BussinessController";
import { Route } from "../../services/factories/router-factory";

const bussinessRoutes = (controller: IBusinessController): Route<IBusinessController>[] => [{
	handlerType: "get",
	path: "/bussiness",
	controller: controller,
	action: "all"
}, {
	handlerType: "get",
	path: "/bussiness/:id",
	controller: controller,
	action: "one"
}, {
	handlerType: "post",
	path: "/bussiness",
	controller: controller,
	action: "save"
}, {
	handlerType: "delete",
	path: "/bussiness/:id",
	controller: controller,
	action: "remove"
}, {
	handlerType: "get",
	path: "/",
	controller: controller,
	action: "one"
}];

export default bussinessRoutes;