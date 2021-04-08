"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const maishu_node_mvc_1 = require("maishu-node-mvc");
const fs = require("fs");
const errors_1 = require("../errors");
const UrlPattern = require("url-pattern");
const transform_ts_1 = require("maishu-nws-js/out/transform/transform-ts");
const os = require("os");
const maishu_toolkit_1 = require("maishu-toolkit");
// let htmlPath = path.join(__dirname, "../static/index.html");
let pgaeAction = maishu_node_mvc_1.action(function (virtualPath, ctx) {
    let root = typeof ctx.rootDirectory == "string" ? new maishu_node_mvc_1.VirtualDirectory(ctx.rootDirectory) : ctx.rootDirectory;
    let websiteConfig = HomeController.loadWebsiteConfig(root);
    let routers = websiteConfig.routers || {};
    let keys = Object.keys(routers);
    for (let i = 0; i < keys.length; i++) {
        let p = new UrlPattern(keys[i]);
        let m = p.match(virtualPath);
        if (m) {
            Object.assign(m, routers[keys[i]]);
            m.html = m.html || "index.html";
            return m;
        }
    }
    return null;
});
let HomeController = class HomeController {
    g(ctx, d) {
        console.log(d);
        let staticDir = ctx.rootDirectory.findDirectory("static");
        console.assert(staticDir != null);
        let htmlPath = staticDir === null || staticDir === void 0 ? void 0 : staticDir.findFile(d.html);
        if (!htmlPath)
            throw errors_1.errors.physicalPathNotExists(d.html);
        let buffer = fs.readFileSync(htmlPath);
        let html = buffer.toString();
        return html;
    }
    static loadWebsiteConfig(dir) {
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
            throw errors_1.errors.notFoundWebsiteConfigFile();
        let code = fs.readFileSync(tsPhysicalPath).toString();
        code = transform_ts_1.transformTS(code, {
            presets: [
                ["@babel/preset-env", {
                        "targets": { chrome: 58 }
                    }]
            ],
            plugins: [
                ["@babel/plugin-transform-typescript", { isTSX: true }],
                ["@babel/plugin-proposal-decorators", { legacy: true }],
            ]
        });
        let tmpFile = maishu_toolkit_1.pathConcat(os.tmpdir(), maishu_toolkit_1.guid());
        fs.writeFileSync(tmpFile, code);
        let mod = require(tmpFile);
        this.websiteConfig = mod.default || mod;
        return this.websiteConfig;
    }
};
__decorate([
    pgaeAction,
    __param(0, maishu_node_mvc_1.serverContext), __param(1, maishu_node_mvc_1.routeData)
], HomeController.prototype, "g", null);
HomeController = __decorate([
    maishu_node_mvc_1.controller("/")
], HomeController);
exports.default = HomeController;
