"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVirtualPaths = void 0;
const fs = require("fs");
const path = require("path");
const maishu_toolkit_1 = require("maishu-toolkit");
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
        let virtuaPath = maishu_toolkit_1.pathConcat(basePath, files[i]);
        result[virtuaPath] = p;
    }
    return result;
}
exports.getVirtualPaths = getVirtualPaths;
