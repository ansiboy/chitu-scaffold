"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = void 0;
const maishu_toolkit_1 = require("maishu-toolkit");
class Errors extends maishu_toolkit_1.Errors {
    notPhysicalPath(path) {
        let msg = `Path '${path}' is not a physical path.`;
        let error = new Error(msg);
        error.name = Errors.prototype.notPhysicalPath.name;
        return error;
    }
    physicalPathNotExists(path) {
        let msg = `Path '${path}' is not exists.`;
        let error = new Error(msg);
        error.name = Errors.prototype.physicalPathNotExists.name;
        return error;
    }
    baseRouterNull() {
        let msg = `Base router is null.`;
        let error = new Error(msg);
        error.name = Errors.prototype.baseRouterNull.name;
        return error;
    }
    notMatchBaseRouter(url, router) {
        let msg = `The url '${url}' is not match base router '${router}'.`;
        let error = new Error(msg);
        error.name = Errors.prototype.notMatchBaseRouter.name;
        return error;
    }
}
exports.errors = new Errors();
