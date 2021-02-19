"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVirtualPaths = void 0;
const fs = require("fs");
const path = require("path");
const maishu_toolkit_1 = require("maishu-toolkit");
const errors_1 = require("./errors");
/** @param {string} [basePath]  */
function getVirtualPaths(basePath, targetPath) {
    basePath = basePath || "/";
    let existsFilePaths = [];
    if (targetPath != null) {
        if (path.isAbsolute(targetPath) == false)
            throw errors_1.errors.notPhysicalPath(targetPath);
        fs.readdirSync(targetPath).forEach(o => {
            let p = maishu_toolkit_1.pathConcat(targetPath, o);
            if (fs.statSync(p).isFile())
                existsFilePaths.push(o);
        });
    }
    let staticDir = path.join(__dirname, "static");
    let files = fs.readdirSync(staticDir);
    let result = {};
    for (let i = 0; i < files.length; i++) {
        let p = path.join(staticDir, files[i]);
        if (!fs.statSync(p).isFile())
            continue;
        if (files[i].endsWith(".d.ts"))
            continue;
        if (existsFilePaths.indexOf(files[i]) >= 0)
            continue;
        let virtuaPath = maishu_toolkit_1.pathConcat(basePath, files[i]);
        result[virtuaPath] = p;
    }
    return result;
}
exports.getVirtualPaths = getVirtualPaths;
