const fs = require("fs");
const path = require("path");
const { pathConcat } = require("maishu-toolkit");

/** @param {string} [basePath]  */
function getVirtualPaths(basePath) {
    basePath = basePath || "/";

    let staticDir = path.join(__dirname, "static");
    let files = fs.readdirSync(staticDir);
    /** @type {{ [key: string]: string }} */
    let result = {};
    for (let i = 0; i < files.length; i++) {
        let p = path.join(staticDir, files[i]);
        if (!fs.statSync(p).isFile())
            continue;

        if (files[i].endsWith(".d.ts"))
            continue;

        let virtuaPath = pathConcat(basePath, files[i]);
        result[virtuaPath] = p;
    }

    return result;
}


module.exports = {
    getVirtualPaths: getVirtualPaths
}