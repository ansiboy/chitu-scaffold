const { describe } = require("mocha");
const { getVirtualPaths } = require("../index");
const assert = require("assert");

describe("test", function () {
    it("getVirtualPaths", function () {
        let virtuaPaths = getVirtualPaths();
        assert.ok(virtuaPaths != null);
    })
})