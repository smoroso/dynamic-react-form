import { expect } from "chai";
import formService from "./form_service.js";

describe("API Calls", function() {
  describe("fetching form", function() {
    it("returns a valid object when the json exists", function() {
      const definition = formService.getFormDefinition("create_channel");
      expect(typeof definition).to.equal("object");
    });

    it("returns an error 500 for invalid json endpoint", function() {
      expect(() => formService.getFormDefinition("invalid_definition")).to.throw("ENOENT: no such file or directory, open 'src/config/form/form_definitions/invalid_definition.json'");
    });
  });
});
