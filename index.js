"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceVirtualPaths = exports.getVirtualPaths = void 0;
const fs = require("fs");
const path = require("path");
const maishu_toolkit_1 = require("maishu-toolkit");
const errors_1 = require("./errors");
const maishu_node_mvc_1 = require("maishu-node-mvc");
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
/**
 * 获取文件虚拟路径
 *  @param {string|VirtualDirectory} [rootDirectory]
 */
function sourceVirtualPaths(rootDirectory) {
    if (!rootDirectory)
        throw errors_1.errors.argumentNull("rootDirectory");
    let root = typeof rootDirectory == "string" ? new maishu_node_mvc_1.VirtualDirectory(rootDirectory) : rootDirectory;
    let virtualDirectories = ["static", "controllers"];
    let result = {};
    virtualDirectories.forEach(dir => {
        let dirPhysicalPath = maishu_toolkit_1.pathConcat(__dirname, dir);
        let files = fs.readdirSync(dirPhysicalPath);
        for (let i = 0; i < files.length; i++) {
            let p = maishu_toolkit_1.pathConcat(dirPhysicalPath, files[i]);
            if (!fs.statSync(p).isFile())
                continue;
            if (files[i].endsWith(".d.ts"))
                continue;
            let dirRelativePath = maishu_toolkit_1.pathConcat(dir, files[i]);
            if (root != null && root.findFile(dirRelativePath))
                continue;
            let virtuaPath = maishu_toolkit_1.pathConcat(dir, files[i]);
            result[virtuaPath] = p;
        }
    });
    return result;
}
exports.sourceVirtualPaths = sourceVirtualPaths;
