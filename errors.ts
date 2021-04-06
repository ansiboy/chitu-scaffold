import { Errors as BaseErrors } from "maishu-toolkit";

class Errors extends BaseErrors {
    notPhysicalPath(path: string) {
        let msg = `Path '${path}' is not a physical path.`;
        let error = new Error(msg);
        error.name = Errors.prototype.notPhysicalPath.name;
        return error;
    }
    physicalPathNotExists(path: string) {
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
    notMatchBaseRouter(url: string, router: string) {
        let msg = `The url '${url}' is not match base router '${router}'.`;
        let error = new Error(msg);
        error.name = Errors.prototype.notMatchBaseRouter.name;
        return error;
    }
}

export let errors = new Errors();