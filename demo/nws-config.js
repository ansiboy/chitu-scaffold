const { getVirtualPaths } = require("../index");
let fileVirtualPaths = getVirtualPaths("static");
module.exports = {
    "port": 5262,
    virtualPaths: fileVirtualPaths,
}