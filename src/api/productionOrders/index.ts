import * as restify from "restify";
import {getAll, getById} from "./get";

const routes = new (require("restify-router").Router)();

routes.get("/", getAll);
routes.get("/:id", getById);

export default routes;