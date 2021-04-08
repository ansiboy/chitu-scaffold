import { WebsiteConfig } from "./types";
export { WebsiteConfig } from "./types";

let websiteConfig: WebsiteConfig = {
    mode: "development",
    requirejs: {
        paths: {
            "url-pattern": "node_modules/url-pattern/lib/url-pattern"
        }
    }
}

export default websiteConfig