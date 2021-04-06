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
const path = require("path");
const fs = require("fs");
const errors_1 = require("../errors");
let htmlPath = path.join(__dirname, "../static/index.html");
let HomeController = class HomeController {
    g(ctx) {
        if (!fs.existsSync(htmlPath))
            throw errors_1.errors.physicalPathNotExists(htmlPath);
        let buffer = fs.readFileSync(htmlPath);
        let html = buffer.toString();
        return html;
    }
};
__decorate([
    maishu_node_mvc_1.action("*.ct", "*.ct/*"),
    __param(0, maishu_node_mvc_1.serverContext)
], HomeController.prototype, "g", null);
HomeController = __decorate([
    maishu_node_mvc_1.controller("/")
], HomeController);
exports.default = HomeController;
