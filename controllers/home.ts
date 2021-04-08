import { controller, action, serverContext, ServerContext, ContentResult, VirtualDirectory } from "maishu-node-mvc";
import * as path from "path";
import * as fs from "fs";
import { errors } from "../errors";
import { WebsiteConfig } from "../static/types";
import * as UrlPattern from "url-pattern";
import { transformTS } from "maishu-nws-js/out/transform/transform-ts";
import * as vm from "vm";
import * as os from "os";
import { guid, pathConcat } from "maishu-toolkit";

let htmlPath = path.join(__dirname, "../static/index.html");

@controller("/")
export default class HomeController {
    private static websiteConfig: WebsiteConfig;

    @action((virtualPath, ctx) => {
        let root = typeof ctx.rootDirectory == "string" ? new VirtualDirectory(ctx.rootDirectory) : ctx.rootDirectory;
        let websiteConfig = HomeController.loadWebsiteConfig(root);
        let routers = websiteConfig.routers || {};
        let keys = Object.keys(routers);
        for (let i = 0; i < keys.length; i++) {
            let p = new UrlPattern(keys[i]);
            let m = p.match(virtualPath);
            if (m)
                return m;
        }
        return null;
    })
    g(@serverContext ctx: ServerContext) {
        if (!fs.existsSync(htmlPath))
            throw errors.physicalPathNotExists(htmlPath);

        let buffer = fs.readFileSync(htmlPath);
        let html = buffer.toString();
        return html;
    }

    static loadWebsiteConfig(dir: VirtualDirectory): WebsiteConfig {

        if (this.websiteConfig != null)
            return this.websiteConfig;

        let jsPath = "static/website-config.js";
        let tsPath = "static/website-config.ts";
        let tsxPath = "static/website-config.tsx";

        let jsPhysicalPath = dir.findFile(jsPath);
        if (jsPhysicalPath) {
            let mod = require(jsPhysicalPath);
            this.websiteConfig = mod.default || mod;
            return this.websiteConfig;
        }

        let tsPhysicalPath = dir.findFile(tsPath);
        if (!tsPhysicalPath)
            tsPhysicalPath = dir.findFile(tsxPath);

        if (!tsPhysicalPath)
            throw errors.notFoundWebsiteConfigFile();

        let code = fs.readFileSync(tsPhysicalPath).toString();
        code = transformTS(code, {
            presets: [
                ["@babel/preset-env", {
                    "targets": { chrome: 58 }
                }]
            ],
            plugins: [
                ["@babel/plugin-transform-typescript", { isTSX: true }],
                ["@babel/plugin-proposal-decorators", { legacy: true }],
            ]
        })

        let tmpFile = pathConcat(os.tmpdir(), guid());
        fs.writeFileSync(tmpFile, code);

        let mod = require(tmpFile);

        this.websiteConfig = mod.default || mod;
        return this.websiteConfig;

    }
}

