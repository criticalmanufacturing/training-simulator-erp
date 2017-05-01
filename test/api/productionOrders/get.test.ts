import * as chai from "chai";
chai.use(require("chai-http"));

import {_readDataFromFile} from "../../../src/api/productionOrders/get";

describe("API ProductionOrder GET", () => {

    let server = require("../../../src/index").default;

    it("should be able to read the data file and parse it", () => {
        let pos = _readDataFromFile();

        chai.expect(pos).to.exist;
        chai.expect(pos).to.have.lengthOf(9489);
    });

    it("should be able to get a specific Production Order by /:id", () => {
        let id = 20053652;
        return chai.request(server).get(`/api/productionOrder/${id}`).send(null).then((result) => {
            chai.expect(result).to.have.status(200);

            let body = result.body;
            chai.expect(body).to.exist;
            chai.expect(body.id).to.be.equal(id);
        });
    });

    it("should be to get all Production Orders", () => {
        return chai.request(server).get("/api/productionOrder").send(null).then((result) => {
            chai.expect(result).to.have.status(200);

            let body = result.body;
            chai.expect(body).to.exist;
            chai.expect(body.result).to.have.length(9489);
            chai.expect(body.totalRows).to.equal(9489);
        });
    });
});