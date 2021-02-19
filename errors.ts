import { Errors as BaseErrors } from "maishu-toolkit";

class Errors extends BaseErrors {
    notPhysicalPath(path: string) {
        let msg = `Path '${path}' is not a physical path.`;
        let error = new Error(msg);
        return error;
    }
}

export let errors = new Errors();