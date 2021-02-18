import * as  fs from "fs";
import * as path from "path";
import { pathConcat } from "maishu-toolkit";

/** @param {string} [basePath]  */
export function getVirtualPaths(basePath?: string) {
    basePath = basePath || "/";

    let staticDir = path.join(__dirname, "static");
    let files = fs.readdirSync(staticDir);
    /** @type {{ [key: string]: string }} */
    let result: { [key: string]: string } = {};
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


