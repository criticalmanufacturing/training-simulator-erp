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

    describe("GET /:id", () => {
        it("should be able to get a specific Production Order by ", () => {
            let id = 20053652;
            return chai.request(server).get(`/api/productionOrder/${id}`).send(null).then((result) => {
                chai.expect(result).to.have.status(200);

                let body = result.body;
                chai.expect(body).to.exist;
                chai.expect(body.id).to.be.equal(id);
            });
        });

        it("should throw an error if no id is given", () => {
            return chai.request(server).get(`/api/productionOrder/`).send(null).then((result) => {
                chai.assert(false);
            }).catch((error: Error) => {
                chai.expect(error).to.have.status(409);

                let response = (<any>error).response.body.message;
                chai.expect(response).to.equal("Id");
            });
        });

        it("should throw an error if the id is invalid", () => {
            return chai.request(server).get(`/api/productionOrder/-1`).send(null).then((result) => {
                chai.assert(false);
            }).catch((error: Error) => {
                chai.expect(error).to.have.status(404);

                let response = (<any>error).response.body.message;
                chai.expect(response).to.contain("Id -1");
            });
        });
    });

    describe("GET /", () => {
        it("should be to get all Production Orders", () => {
            return chai.request(server).get("/api/productionOrder").send(null).then((result) => {
                chai.expect(result).to.have.status(200);

                let body = result.body;
                chai.expect(body).to.exist;
                chai.expect(body.result).to.have.length(9489);
                chai.expect(body.totalRows).to.equal(9489);
            });
        });

        it("should paginate the get Production Orders", () => {
            return chai.request(server).get("/api/productionOrder?pageNumber=0&pageSize=10")
            .send(null)
            .then((result) => {
                chai.expect(result).to.have.status(200);

                let body = result.body;
                chai.expect(body).to.exist;
                chai.expect(body.result).to.have.length(10);
                chai.expect(body.totalRows).to.equal(9489);
            });
        });

        it("should search for all Production Orders started by a given name", () => {
            return chai.request(server).get("/api/productionOrder?name=41A")
            .send(null)
            .then((result) => {
                chai.expect(result).to.have.status(200);

                let body = result.body;
                chai.expect(body).to.exist;
                chai.expect(body.result).to.have.length(6);
                chai.expect(body.totalRows).to.equal(6);
            });
        });
    });
});