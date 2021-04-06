const { pathConcat } = require("../../node-mvc/out");
const { sourceVirtualPaths } = require("../index");
let fileVirtualPaths = sourceVirtualPaths(__dirname);

module.exports = {
    "port": 5262,
    virtualPaths: fileVirtualPaths,
    processors: {
        Proxy: {
            proxyTargets: {
                "/design/(\\S*)": `http://127.0.0.1:6736/$1`,
            }
        }
    }
}