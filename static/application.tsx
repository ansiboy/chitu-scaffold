
import { Application } from "maishu-chitu-react";
import { pathConcat } from "maishu-toolkit";
import { WebsiteConfig, default as w } from "./website-config";
import * as UrlPattern from "url-pattern";


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

    parseUrl(url: string) {

        let pathname: string;
        if (url.startsWith("http")) {
            let a = document.createElement("a");
            a.href = url;
            pathname = a.pathname;
        }
        else {
            pathname = url;
        }

        if (pathname[0] != "/")
            pathname = "/" + pathname;

        let keys = Object.keys(w.routers);
        for (let i = 0; i < keys.length; i++) {
            let p = new UrlPattern(keys[i]);
            let m = p.match(pathname);
            if (m) {
                m = Object.assign(m, w.routers[keys[i]]);
                if (!m.pageName)
                    throw new Error("Router parse result is not contains pageName.");

                let pageName = Array.isArray(m.pageName) ? (m.pageName as string[]).join("/") : m.pageName;
                delete m.pageName;
                return { pageName, values: m };
            }
        }


        return super.parseUrl(url);
    }

}

export function run(config: any, req) {
    let app: MyApplication = window["app"] = window["app"] || new MyApplication(config, req);
    return window["app"];
}
