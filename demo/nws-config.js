const { pathConcat } = require("../../node-mvc/out");
const { getVirtualPaths } = require("../index");
let fileVirtualPaths = getVirtualPaths("static", pathConcat(__dirname, "static"));
debugger
module.exports = {
    "port": 5262,
    virtualPaths: fileVirtualPaths,
}