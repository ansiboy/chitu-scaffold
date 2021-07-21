const { getVirtualPaths } = require("../index");
let fileVirtualPaths = getVirtualPaths();
const m = require("maishu-node-mvc");

debugger
module.exports = {
    "port": 5262,
    virtualPaths: fileVirtualPaths,
    processors: {
        Proxy: {
            proxyTargets: {
                "/design/(\\S*)": `http://127.0.0.1:6736/$1`,
            }
        }
    },
}