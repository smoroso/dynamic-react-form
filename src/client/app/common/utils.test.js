import { expect } from "chai";
import { tap } from "./utils";

describe("tap", function() {
  it("returns the provided param, not the result of the provided method", function() {
    const arr = [1, 2, 3, 4, 5];
    expect(arr.slice().splice(2, 1)).to.eql([3]);
    expect(tap(arr, (arr) => arr.splice(2, 1))).to.eql([1, 2, 4, 5]);
  });
});