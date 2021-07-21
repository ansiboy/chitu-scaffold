const mvc = require("maishu-node-mvc");
const { register } = require("maishu-nws-mvc/out/attributes");
const path = require("path");
const { ModuleFilenameHelpers } = require("webpack");

class ScaffoldController {
    async test() {
        return "Hello World"
    }
}

exports.ScaffoldController = ScaffoldController;
register(ScaffoldController, __filename, { "test": ["/scaffold/test"] })