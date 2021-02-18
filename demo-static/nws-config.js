const { getVirtualPaths } = require("../index");
let fileVirtualPaths = getVirtualPaths();
module.exports = {
    "port": 5263,
    virtualPaths: fileVirtualPaths,
}