import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "./server";

chai.use(chaiHttp);

describe("API Calls", function() {
  describe("non existing endpoint", function() {
    it("fails, as expected", function(done) {
      chai.request(server)
        .get("/huh")
        .end(function(err, res) {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe("form definitions", function() {
    it("returns a valid form definition for valid endpoint", function(done) {
      chai.request(server.listen())
        .get("/api/getFormDefinition/add_channel")
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.text).not.to.be.null;
          done();
        });
    });
  });
});
