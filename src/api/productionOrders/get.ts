import * as restify from "restify";
import { ProductionOrder } from "../../models/productionOrder";

export function getAll(req: restify.Request, res: restify.Response, next: restify.Next): void {
    let pos = _readDataFromFile();
    let totalRows = pos.length;

    if (req.params) {
        if (req.params.name || req.params.Name) {
            let name = req.params.name || req.params.Name;
            pos = pos.filter((po) => {
                return po.name.startsWith(name);
            });
        }

        totalRows = pos.length;

        if (req.params.pageNumber != null && req.params.pageSize != null) {
            let pageNumber = parseInt(req.params.pageNumber);
            let pageSize = parseInt(req.params.pageSize);

            pos = pos.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
        }
    }

    res.send({
        result: pos,
        totalRows: totalRows
    });
    next();
};

export function getById(req: restify.Request, res: restify.Response, next: restify.Next) {

    if (!req.params.id) {
        return next(new restify.InvalidArgumentError("Id"));
    }

    let id = parseInt(req.params.id);
    let pos = _readDataFromFile();

    let po = pos.find((po) => po.id === id);

    if (!po) {
        return next(new restify.NotFoundError(`Production Order with Id ${id} was not found in the system`));
    }

    res.send(po);

    next();
}

/**
 * Reads all the Production Orders from a data file
 * @returns An array of {@see ProductionOrder}
 */
export function _readDataFromFile(): ProductionOrder[] {
    let data = require("./data.json");

    return data.data.map((item: any): ProductionOrder => {

        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + new Date(item[19]).getDay());

        return <ProductionOrder>{
            id: item[0],
            name: item[1],
            commodity: {
                name: item[9],
                description: item[10]
            },
            customer: item[20],
            quantity: parseInt(item[11]),
            unit: item[12] || "Unit",
            dueDate: dueDate
        };
    }).filter((po: ProductionOrder) => {
        return po.quantity > 0;
    });
};