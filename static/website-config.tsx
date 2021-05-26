import { WebsiteConfig as C } from "./types";

let websiteConfig: C = {
    mode: "development",
    requirejs: {
        paths: {
        }
    }
}

export type WebsiteConfig = C;

export default websiteConfig