"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maishu_node_web_server_1 = require("maishu-node-web-server");
const maishu_nws_js_1 = require("maishu-nws-js");
const maishu_nws_mvc_1 = require("maishu-nws-mvc");
const path = require("path");
const fs = require("fs");
function startWebServer(settings) {
    let w = new maishu_node_web_server_1.WebServer(settings);
    setVirtualPaths(w);
    let staticFileProcessor = w.requestProcessors.find(maishu_node_web_server_1.StaticFileProcessor);
    console.assert(staticFileProcessor != null);
    staticFileProcessor.options.directoryPath = "static";
    var javaScriptProcessor = new maishu_nws_js_1.JavaScriptProcessor();
    javaScriptProcessor.options.directoryPath = staticFileProcessor.options.directoryPath;
    javaScriptProcessor.options.babel = {
        "\\S+.js$": {
            "presets": [
                ["@babel/preset-env", {
                        "targets": { chrome: 58 }
                    }],
            ],
            plugins: [
                ["@babel/plugin-transform-modules-amd", { noInterop: true }]
            ]
        },
        "\\S+.ts$": {
            "presets": [
                ["@babel/preset-env", {
                        "targets": { chrome: 58 }
                    }]
            ],
            plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-transform-typescript", { isTSX: false }],
                ["@babel/plugin-transform-react-jsx", { "pragma": "React.createElement", "pragmaFrag": "React.Fragment" }],
                ["@babel/plugin-transform-modules-amd", { noInterop: true }],
            ]
        },
        "\\S+.tsx$": {
            "presets": [
                ["@babel/preset-env", {
                        "targets": { chrome: 58 }
                    }]
            ],
            plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-transform-typescript", { isTSX: true }],
                ["@babel/plugin-transform-react-jsx", { "pragma": "React.createElement", "pragmaFrag": "React.Fragment" }],
                ["@babel/plugin-transform-modules-amd", { noInterop: true }],
            ]
        },
    };
    let mvcProcessor = new maishu_nws_mvc_1.MVCRequestProcessor();
    mvcProcessor.options.controllersDirectories = ["controllers"];
    w.requestProcessors.add(javaScriptProcessor);
    w.requestProcessors.add(mvcProcessor);
}
exports.startWebServer = startWebServer;
function setVirtualPaths(w) {
    let staticDir = w.websiteDirectory.findDirectory("static");
    let nodeModulesDir = w.websiteDirectory.findDirectory("node_modules");
    if (staticDir != null && nodeModulesDir != null) {
        staticDir.setPath("node_modules", nodeModulesDir.physicalPath);
    }
    let dirRelativePaths = ["static"];
    while (dirRelativePaths.length > 0) {
        let dirRelativePath = dirRelativePaths.pop();
        let dirPath = path.join(__dirname, dirRelativePath);
        let names = fs.readdirSync(dirPath);
        for (let i = 0; i < names.length; i++) {
            let physicalPath = path.join(dirPath, names[i]);
            let stat = fs.statSync(physicalPath);
            if (stat.isDirectory()) {
                dirRelativePaths.push(path.join(dirRelativePath, names[i]));
            }
            else if (stat.isFile()) {
                let fileRelativePath = maishu_node_web_server_1.pathConcat(dirRelativePath, names[i]);
                if (w.websiteDirectory.findFile(fileRelativePath) == null) {
                    w.websiteDirectory.setPath(fileRelativePath, path.join(__dirname, fileRelativePath));
                }
            }
        }
    }
}
