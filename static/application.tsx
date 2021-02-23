import { Application } from "maishu-chitu-react";

class MyApplication extends Application {

    config: any;

    constructor(args: { config: any }) {
        super(args as any);

        this.config = args.config;
    }
}

export function run(config: any) {
    window["app"] = window["app"] || new MyApplication({ config })
    return window["app"];
}
