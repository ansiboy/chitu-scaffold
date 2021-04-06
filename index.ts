import * as  fs from "fs";
import * as path from "path";
import { pathConcat } from "maishu-toolkit";
import { errors } from "./errors";
import { VirtualDirectory } from "maishu-node-mvc";

/** @param {string} [basePath]  */
export function getVirtualPaths(basePath?: string, targetPath?: string) {
    basePath = basePath || "/";

    let existsFilePaths: string[] = [];

    if (targetPath != null) {
        if (path.isAbsolute(targetPath) == false)
            throw errors.notPhysicalPath(targetPath);

        fs.readdirSync(targetPath).forEach(o => {
            let p = pathConcat(targetPath, o);
            if (fs.statSync(p).isFile())
                existsFilePaths.push(o);
        });
    }

    let staticDir = path.join(__dirname, "static");
    let files = fs.readdirSync(staticDir);
    let result: { [key: string]: string } = {};
    for (let i = 0; i < files.length; i++) {
        let p = path.join(staticDir, files[i]);
        if (!fs.statSync(p).isFile())
            continue;

        if (files[i].endsWith(".d.ts"))
            continue;

        if (existsFilePaths.indexOf(files[i]) >= 0)
            continue;

        let virtuaPath = pathConcat(basePath, files[i]);
        result[virtuaPath] = p;
    }

    return result;
}

/**
 * 获取文件虚拟路径
 *  @param {string|VirtualDirectory} [rootDirectory] 
 */
export function sourceVirtualPaths(rootDirectory: string | VirtualDirectory) {

    if (!rootDirectory)
        throw errors.argumentNull("rootDirectory");

    let root = typeof rootDirectory == "string" ? new VirtualDirectory(rootDirectory) : rootDirectory;
    let virtualDirectories = ["static", "controllers"];

    let result: { [key: string]: string } = {};
    virtualDirectories.forEach(dir => {
        let dirPhysicalPath = pathConcat(__dirname, dir);

        let files = fs.readdirSync(dirPhysicalPath);
        for (let i = 0; i < files.length; i++) {
            let p = pathConcat(dirPhysicalPath, files[i]);
            if (!fs.statSync(p).isFile())
                continue;

            if (files[i].endsWith(".d.ts"))
                continue;

            let dirRelativePath = pathConcat(dir, files[i]);
            if (root != null && root.findFile(dirRelativePath))
                continue;

            let virtuaPath = pathConcat(dir, files[i]);
            result[virtuaPath] = p;
        }
    })



    return result;
}


