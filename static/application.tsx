
import { Application } from "maishu-chitu-react";
import { pathConcat } from "maishu-toolkit";
import { WebsiteConfig, default as w } from "./website-config";

class MyApplication extends Application {

    private req: Function;
    private websiteConfigs: { [sitePath: string]: WebsiteConfig } = {};

    constructor(config: any, req: Function) {
        super(config);

        this.req = req;

    }

    private siteRequireJS = {};

    async loadjs(path: string) {

        if (path.startsWith("modules//")) {
            path = path.substr("modules//".length);
            let arr = path.split("/");
            console.assert(arr.length >= 2);
            let sitePath = arr.shift();
            if (!this.siteRequireJS[sitePath]) {
                let websiteConfig = await this.getWebsiteConfig(sitePath);
                this.siteRequireJS[sitePath] = this.configRequirejs(websiteConfig, sitePath);
            }

            let newPath = `modules/${arr.join('/')}`;
            return new Promise((resolve, reject) => {
                this.siteRequireJS[sitePath]([newPath],
                    mod => {
                        resolve(mod)
                    },
                    err => {
                        reject(err)
                    }
                );
            })
        }

        return new Promise<any>((reslove, reject) => {
            this.req([path],
                function (result: any) {
                    reslove(result);
                },
                function (err: Error) {
                    reject(err);
                });


        });
    }

    private async getWebsiteConfig(sitePath: string): Promise<WebsiteConfig> {
        if (!this.websiteConfigs[sitePath]) {
            this.websiteConfigs[sitePath] = await new Promise<WebsiteConfig>((resolve, reject) => {
                let websiteConfigPath = pathConcat(sitePath, "website-config.js");
                requirejs([websiteConfigPath], mod => {
                    resolve(mod.default || mod);
                }, err => {
                    reject(err);
                })
            })
        }

        return this.websiteConfigs[sitePath];
    }

    private configRequirejs(stationWebsiteConfig: WebsiteConfig, sitePath: string) {
        stationWebsiteConfig.requirejs = stationWebsiteConfig.requirejs || { paths: {} };
        stationWebsiteConfig.requirejs.paths = stationWebsiteConfig.requirejs.paths || {};
        stationWebsiteConfig.requirejs.context = sitePath;
        stationWebsiteConfig.requirejs.baseUrl = sitePath;

        let req = requirejs.config(stationWebsiteConfig.requirejs);
        return req;
    }



}

export function run(config: any, req) {
    let app: MyApplication = window["app"] = window["app"] || new MyApplication(config, req);
    return window["app"];
}
