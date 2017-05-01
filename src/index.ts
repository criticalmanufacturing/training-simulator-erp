import * as restify from "restify";
import * as yargs from "yargs";
let pack = require("../package.json");

let args = yargs
    .usage("$0 [args]")
    .option("port", {
        number: true,
        default: 9999,
        description: "Port where the simulator will run"
    })
    .help()
    .argv;

let app = restify.createServer({
    name: "@criticalmanufacturing/training-erp"
});

app.use(restify.bodyParser({ mapParams: true }));
app.use(restify.dateParser());
app.use(restify.queryParser());
app.use(restify.gzipResponse());
app.use(restify.CORS());

// Setup Routes
let apiRouter = new (require("restify-router").Router)();

import poRoutes from "./api/productionOrders/index";
apiRouter.add("/productionOrder", poRoutes);

// Api routes
apiRouter.applyRoutes(app, "/api");

app.listen(args.port, () => {
    console.info("*****************************************");
    console.info("*                                       *");
    console.info("* Welcome to CMF Training MES Simulator *");
    console.info("*                                       *");
    console.info("*****************************************");
    console.info(`* Listening on port ${args.port}                *`);
    console.info(`* Version: ${pack.version}                        *`);
    console.info("*****************************************");
});

export default app;