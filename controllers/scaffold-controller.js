const mvc = require("maishu-node-mvc");
const { register } = require("maishu-nws-mvc/out/attributes");
const path = require("node:path");

class ScaffoldController {
    async test() {
        return "Hello World"
    }
}

register(ScaffoldController, {}, __filename, { "test": ["/scaffold/test"] })